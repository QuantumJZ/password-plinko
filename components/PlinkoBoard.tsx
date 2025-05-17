"use client";

import { useEffect, useRef, useState, FC } from "react";
import { PlinkoPhysics } from "@/lib/physics";
import { getStageBuckets, CharacterGroup, generateStage3Buckets } from "@/lib/PlinkoStages";

interface Highlight {
    bucketIndex: number;
    id: number;
}

interface PlinkoBoardProps {
	password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setHistory: (entry: { stage: number; char: string | null }) => void;
}


const PlinkoBoard: FC<PlinkoBoardProps> = ({ password, setPassword, setHistory }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const plinkoRef = useRef<PlinkoPhysics | null>(null);
    const width = 800;
    const height = 700;
    const rows = 9;
    const cols = 16;
    const spacing = width / cols;

    const [highlights, setHighlights] = useState<Highlight[]>([]);
    let highlightId = 0;

    type StageState = {
        stage: number;
        group?: CharacterGroup;
        range?: string;
    };

    let currentState: StageState = { stage: 1 };

	// Function to process the bucket hit and update the state
    const processBucketHit = (bucketIndex: number) => {
        const { stage, group, range } = currentState;
        let buckets: string[] = [];

        if (stage === 3 && range) {
            buckets = generateStage3Buckets(range);
        } else {
            buckets = getStageBuckets(stage, group);
        }

        const selected = buckets[bucketIndex];
        setHistory({ stage: stage, char: selected });

        if (stage === 1) {
            currentState = { stage: 2, group: selected as CharacterGroup };
        } else if (stage === 2 && group) {
            currentState = { stage: 3, range: selected, group: undefined };
        } else if (stage === 3 && range) {
            setPassword((prevPassword: string) => prevPassword + selected);
            currentState = { stage: 1, group: undefined, range: undefined };
        }
    };

    // Trigger the number and bucket highlights when a bucket is hit
    const handleBucketHit = (bucketIndex: number) => {
		processBucketHit(bucketIndex);

        const newHighlight = { bucketIndex, id: highlightId++ };
        setHighlights((prev) => [...prev, newHighlight]);

        setTimeout(() => {
            setHighlights((prev) => prev.filter((h) => h.id !== newHighlight.id));
        }, 500);
    };

	// Initialize the Plinko board and add pegs
    useEffect(() => {
        if (!containerRef.current) return;

        const plinko = new PlinkoPhysics({
            width,
            height,
            container: containerRef.current,
            onBucketHit: handleBucketHit,
        });

        plinkoRef.current = plinko;

        for (let i = 0; i < cols; i ++) {
            for (let j = 0; j < rows; j++) {
                let x = 20 + i * spacing;
                if (j % 2 == 0) {
					x += spacing / 2;
                }
				let y = 2 * spacing + j * spacing;
                plinko.addPeg(x, y, 4);
            }
        }

        return () => {
            plinko.stop();
        };
    }, [width, height]);

	// Handle click events to add a ball to the Plinko board
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !plinkoRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (y <= 80) {
            plinkoRef.current.addBall(x, y, 15);
        }
    };

    return (
        <div className="relative w-full h-full" onClick={handleClick}>
            <div ref={containerRef} className="w-full h-full" />
            {highlights.map(({ bucketIndex, id }) => (
                <div
                    key={id}
                    className="absolute bottom-0 w-16 h-24 rounded-full pointer-events-none"
                    style={{
                        left: `${bucketIndex * 80 + 40 - 32}px`,
                        background: 'radial-gradient(ellipse at bottom, rgba(255, 255, 150, 0.6), transparent 70%)',
                        filter: 'blur(8px)',
                        animation: 'flashlightMove 700ms ease-out forwards',
                    }}
                />
            ))}

            <style jsx>{`
              @keyframes flashlightMove {
                0% {
                  transform: translateY(0);
                  opacity: 1;
                }
                100% {
                  transform: translateY(-40px);
                  opacity: 0;
                }
              }
            `}</style>

            <div className="absolute bottom-2 left-0 w-full h-[50px] flex justify-between items-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className={`text-white font-bold text-3xl w-[80px] text-center transition-colors duration-300 ${highlights.some((h) => h.bucketIndex === index) ? "text-yellow-400" : ""
                            }`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            {/*<div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-center text-white font-bold pointer-events-none bg-transparent text-4xl rainbow-outline">*/}
            {/*    Click Here To Play*/}
            {/*</div>*/}
            <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-center text-white font-bold border-2 border-dotted border-white pointer-events-none bg-transparent text-4xl">
                Click Here To Play
            </div>
        </div>
    );
};

export default PlinkoBoard;
