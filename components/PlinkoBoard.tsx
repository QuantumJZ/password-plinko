"use client";

import { useEffect, useRef, useState } from "react";
import { PlinkoPhysics } from "@/lib/physics";

interface Highlight {
    bucketIndex: number;
    id: number;
}

const PlinkoBoard = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const plinkoRef = useRef<PlinkoPhysics | null>(null);
    const width = 800;
    const height = 700;
    const rows = 9;
    const cols = 16;
    const spacing = width / cols;

    const [highlights, setHighlights] = useState<Highlight[]>([]);
    let highlightId = 0;

    const handleBucketHit = (bucketIndex: number) => {
        const newHighlight = { bucketIndex, id: highlightId++ };
        setHighlights((prev) => [...prev, newHighlight]);

        setTimeout(() => {
            setHighlights((prev) => prev.filter((h) => h.id !== newHighlight.id));
        }, 500);
    };

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
            <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-center text-white font-bold border-2 border-dotted border-white pointer-events-none bg-transparent text-4xl">
                Click Here To Play
            </div>
        </div>
    );
};

export default PlinkoBoard;
