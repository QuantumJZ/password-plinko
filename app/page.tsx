"use client"

import PlinkoBoard from '@/components/PlinkoBoard';
import { useState } from "react";

export default function Home() {
	const [password, setPassword] = useState<string>("");

	return (
		<div className="flex flex-col content-center justify-around min-h-screen">
			<header className="flex text-white text-5xl font-bold justify-center">Plinko Password Generator</header>
			<main className="flex flex-col gap-[32px] row-start-2 items-center">
				<div className="border-4 border-white">
					<PlinkoBoard password={password} setPassword={setPassword} />
				</div>
			</main>
			<footer className="flex gap-4 items-center justify-center p-4">
				<div className="flex items-center border border-white rounded-lg p-2 bg-black/50">
					<input
						className="bg-transparent text-white placeholder-gray outline-none px-2 w-64"
						placeholder="Generated Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="ml-2 p-1 text-white hover:bg-white/10 rounded"
						aria-label="Copy Password"
						onClick={() => navigator.clipboard.writeText(password)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					</button>
				</div>
			</footer>
		</div>
	);
}
