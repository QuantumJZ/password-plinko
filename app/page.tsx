"use client"

import PlinkoBoard from '@/components/PlinkoBoard';
import { useState } from "react";

export default function Home() {
	const [password, setPassword] = useState<string>("");

	return (
		<div className="flex flex-col content-center justify-around min-h-screen">
			<header className="flex text-white text-5xl font-bold justify-center">Plinko Password Generator</header>
			<main className="flex flex-col gap-[32px] row-start-2 items-center">
				<div className="relative flex items-center">
					<div className="absolute left-[-475px] text-white text-lg max-w-[425px] space-y-4">
						<h2 className="text-3xl font-bold mb-2">How To Play</h2>
						<ol className="list-decimal list-inside space-y-2">
							<li>Click the top area of the plinko board to drop a chip.</li>
							<li>You need to land 3 chips to select 1 character for your password.</li>
							<li>
								<b>Stages:</b>
								<ul className="list-disc list-inside pl-4 space-y-1 mt-1">
									<li>Stage 1: Select a group (Lowercase, Uppercase, Numbers/Symbols)</li>
									<li>Stage 2: Choose a range within the group</li>
									<li>Stage 3: Pick the specific character</li>
								</ul>
							</li>
							<li>Copy or modify the generated password at the bottom of the screen.</li>
							<li>View your recent play history on the right side of the board.</li>
						</ol>
					</div>

					<div className="border-4 border-white">
						<PlinkoBoard password={password} setPassword={setPassword} />
					</div>
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
