export default function Instructions() {
	return (
		<div className="text-white text-lg max-w-[450px] space-y-4">
			<h2 className="text-2xl font-bold mb-2">How To Play</h2>
			<ol className="list-decimal list-inside space-y-2">
				<li>Click the top area of the plinko board to drop a chip.</li>
				<li>You need to land 3 chips to select 1 character for your password.</li>
				<li>
					<b>Stages:</b>
					<ul className="list-disc list-inside pl-4 space-y-1 mt-1">
						<li>
							<b>Stage 1 - Group Selection:</b>
							Choose a character group from the top area of the plinko board. The available groups are:
							<ul className="list-disc pl-4 mt-1 space-y-1">
								<li>Lowercase (a-z)</li>
								<li>Uppercase (A-Z)</li>
								<li>Numbers/Symbols (0-9, !@#$%^&*_+)</li>
							</ul>
						</li>
						<li>
							<b>Stage 2 - Range Selection:</b>
							After selecting a group, you'll need to pick a specific range within that group. Each group is divided into 10 ranges:
							<ul className="list-disc pl-4 mt-1 space-y-1">
								<li>e.g., Lowercase: a-c, d-f, g-i, etc.</li>
								<li>e.g., Uppercase: A-C, D-F, G-I, etc.</li>
								<li>e.g., Numbers/Symbols: 0-1, 2-3, 4-5, etc.</li>
							</ul>
						</li>
						<li>
							<b>Stage 3 - Character Selection:</b>
							 Once a range is chosen, you will pick a specific character within that range. The board will cycle through characters in the selected range (e.g., "a-c" cycles through a, b, c).
						</li>
					</ul>
				</li>
				<li>Copy or modify the generated password at the bottom of the screen.</li>
				<li>View your recent play history on the right side of the board.</li>
			</ol>
		</div>
	);
}
