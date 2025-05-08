"use client";

import { useEffect, useRef } from "react";
import { PlinkoPhysics } from "@/lib/physics";

const PlinkoBoard = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const width = 800;
    const height = 600;
    const rows = 6;
    const cols = 10;
	const spacing = width / cols;

    useEffect(() => {
        if (!containerRef.current) return;

        const plinko = new PlinkoPhysics({ width, height, container: containerRef.current });

        // Add pegs
        for (let i = 0; i < cols; i ++) {
            for (let j = 0; j < rows; j++) {
                let x = i * spacing;
                if (j % 2 == 0) {
					x += spacing / 2;
                }
				let y = spacing + j * spacing;
                plinko.addPeg(x, y, 4);
            }
        }

		for (let i = 0; i < 10; i++) {
			setTimeout(() => {
				let ball = plinko.addBall(width / 2, 25, 15);
			}, 1000 * i);
		}

        return () => {
            plinko.stop();
        };
    }, [width, height]);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default PlinkoBoard;
