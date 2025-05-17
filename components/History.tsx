import { useState, useEffect } from "react";

interface HistoryProps {
	history: { stage: number; char: string | null } | null;
	setHistory: React.Dispatch<React.SetStateAction<{ stage: number; char: string | null } | null>>;
}

export default function History({ history }: HistoryProps) {
	const [currentEntry, setCurrentEntry] = useState<(string | null)[]>([null, null, null, null]);
	const [completedEntries, setCompletedEntries] = useState<string[]>([]);

	// Update the current entry when history changes
	useEffect(() => {
		if (!history) return;

		const { stage, char } = history;

		const updatedEntry = [...currentEntry];

		if (stage === 1) {
			setCurrentEntry([char, null, null, null]);
		} else if (stage === 2) {
			updatedEntry[1] = char;
			setCurrentEntry(updatedEntry);
		} else if (stage === 3) {
			updatedEntry[2] = char;
			updatedEntry[3] = char;
			setCompletedEntries((prev) => [formatEntry(updatedEntry) , ...prev]);

			setCurrentEntry([null, null, null, null]);
		}
	}, [history]);


	// Formatting entries for display
	const formatEntry = (entry: (string | null)[]) => {
		const [s1, s2, s3, char] = entry;
		return `(${s1 ?? "-"}, ${s2 ?? "-"}, ${s3 ?? "-"}: ${char ?? "-"})`;
	};

	return (
		<div className="text-white text-lg max-w-[450px] w-[450px] p-4 border border-white rounded-lg bg-black/50">
			<h2 className="text-xl font-bold mb-2">History</h2>

			<div className="mb-2 italic text-gray-400">
				Current: {formatEntry(currentEntry)}
			</div>

			<div className="h-[600px] overflow-y-auto">
				<ul className="space-y-2">
					{completedEntries.length > 0 ? (
						completedEntries.map((entry, index) => (
							<li key={index}>{entry}</li>
						))
					) : (
						<li>No completed entries yet.</li>
					)}
				</ul>
			</div>
		</div>

	);
}
