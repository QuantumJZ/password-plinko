import Matter, { Engine, Render, World, Bodies, Body, Runner, Events } from 'matter-js';

export interface PhysicsConfig {
    width: number;
    height: number;
    container: HTMLElement;
    onBucketHit?: (bucketIndex: number) => void;
}

export class PlinkoPhysics {
    private engine: Engine;
    private world: World;
    private render: Render;
    private runner: Runner;
    private onBucketHit?: (bucketIndex: number) => void;
    private buckets: Body[] = [];

    constructor({ width, height, container, onBucketHit }: PhysicsConfig) {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.onBucketHit = onBucketHit;

        this.render = Render.create({
            element: container,
            engine: this.engine,
            options: {
                width,
                height,
                wireframes: false,
                background: '#000'
            }
        });

        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
        Render.run(this.render);

        this.addBuckets(width, height);
        this.setupBallBucketCollision();
    }

    addBall(x: number, y: number, radius: number): Body {
        const ball = Bodies.circle(x, y, radius, { restitution: 0.5, friction: 0 });
		ball.label = 'ball';
        World.add(this.world, ball);
        return ball;
    }

    addPeg(x: number, y: number, radius: number): Body {
        const peg = Bodies.circle(x, y, radius, { isStatic: true, friction: 0, restitution: 0.5 });
        peg.render.fillStyle = '#fff';
		peg.label = 'peg';
        World.add(this.world, peg);
        return peg;
    }

    // Add buckets as extensions of the ground
    private addBuckets(width: number, height: number): void {
        const bucketWidth = 80;
        const bucketHeight = 20;
        const bucketCount = 10;
        const spacing = width / bucketCount;

        for (let i = 0; i < bucketCount; i++) {
            const x = i * spacing + spacing / 2;
            const y = height - 10;

            const bottomWall = Bodies.rectangle(x, y + bucketHeight / 2, bucketWidth, 10, { isStatic: true });
            bottomWall.render.fillStyle = '#fff';
            bottomWall.label = `bucket`;
            this.buckets.push(bottomWall);

            World.add(this.world, bottomWall);
            if (i < bucketCount - 1) {
                const wallX = x + bucketWidth / 2;
                const wallHeight = 60;
                const verticalWall = Bodies.rectangle(wallX, y - wallHeight / 2 + 4, 10, wallHeight, { isStatic: true });
                verticalWall.render.fillStyle = '#fff';
                verticalWall.label = 'divider';
                World.add(this.world, verticalWall);
            }
        }
    }

    // Set up collision detection for when balls reach the bottom of a bucket
    private setupBallBucketCollision(): void {
        Events.on(this.engine, 'collisionStart', (event) => {
            const pairs = event.pairs;
            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;
                const ball = bodyA.label === "ball" ? bodyA : bodyB.label === "ball" ? bodyB : null;
                const bucket = this.buckets.find((b) => b.id === bodyA.id || b.id === bodyB.id);
                if (ball && bucket) {
                    const bucketIndex = this.buckets.indexOf(bucket);

                    if (this.onBucketHit) {
                        this.onBucketHit(bucketIndex);
                    }
                    World.remove(this.world, ball);
                }
            });
        });
    }

    update() {
        Engine.update(this.engine);
    }

    stop() {
        Runner.stop(this.runner);
        Render.stop(this.render);
    }
}
