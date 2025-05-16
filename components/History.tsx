import { useState, useEffect } from "react";

interface HistoryProps {
	history: { stage: number; char: string | null } | null;
	setHistory: React.Dispatch<React.SetStateAction<{ stage: number; char: string | null } | null>>;
}

export default function History({ history, setHistory }: HistoryProps) {
    useEffect(() => {
        if (history) {
            console.log("History updated:", history);
        }
    }, [history]);

    return (
        <div className="text-white text-lg max-w-[450px] w-450 p-4 border border-white rounded-lg bg-black/50 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">History</h2>
            <ul className="space-y-2">
                <li>No history yet.</li>
            </ul>
        </div>
    );
}
