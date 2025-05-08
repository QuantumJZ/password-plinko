import Matter, { Engine, Render, World, Bodies, Body, Runner } from 'matter-js';

export interface PhysicsConfig {
    width: number;
    height: number;
    container: HTMLElement;
}

export class PlinkoPhysics {
    private engine: Engine;
    private world: World;
    private render: Render;
    private runner: Runner;

    constructor({ width, height, container }: PhysicsConfig) {
        this.engine = Engine.create();
        this.world = this.engine.world;

        this.render = Render.create({
            element: container,
            engine: this.engine,
            options: {
                width,
                height,
                wireframes: false,
                background: '#fafafa'
            }
        });

        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
        Render.run(this.render);

        this.addGround();
    }

    addBall(x: number, y: number, radius: number): Body {
        const ball = Bodies.circle(x, y, radius, { restitution: 0.5, friction: 0 });
        World.add(this.world, ball);
        return ball;
    }

    addPeg(x: number, y: number, radius: number): Body {
        const peg = Bodies.circle(x, y, radius, { isStatic: true });
        World.add(this.world, peg);
        return peg;
    }

    private addGround(): Body {
        const ground = Bodies.rectangle(
            this.render.options.width!! / 2,
            this.render.options.height!! - 10,
            this.render.options.width!!,
            20,
            { isStatic: true }
        );
        World.add(this.world, ground);
        return ground;
    }

    update() {
        Engine.update(this.engine);
    }

    stop() {
        Runner.stop(this.runner);
        Render.stop(this.render);
    }
}
