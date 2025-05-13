"use client";

import { useEffect, useRef } from "react";
import { PlinkoPhysics } from "@/lib/physics";

const PlinkoBoard = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const plinkoRef = useRef<PlinkoPhysics | null>(null);
    const width = 800;
    const height = 700;
    const rows = 9;
    const cols = 16;
	const spacing = width / cols;

    useEffect(() => {
        if (!containerRef.current) return;

        const plinko = new PlinkoPhysics({ width, height, container: containerRef.current });
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

            <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-center text-white font-bold border-2 border-dotted border-white pointer-events-none bg-transparent text-4xl">
                Click Here To Play
            </div>
        </div>
    );
};

export default PlinkoBoard;
