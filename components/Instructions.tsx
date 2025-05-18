import { useState } from "react";
import { Info } from "lucide-react";

export default function Instructions() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleInstructions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="text-white text-base space-y-4 w-[450px]">
			<div className="flex flex-col justify-center">
                <h2 className="flex justify-center text-4xl font-semibold mb-8">How To Play</h2>
                <button
                    onClick={toggleInstructions}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-white hover:text-black text-white rounded-lg shadow-md transition-all duration-300 border-2 border-white"
                >
                    <Info className="w-5 h-5" />
                    {isOpen ? "Close" : "Show Instructions"}
                </button>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-black text-black p-6 rounded-lg max-w-md w-full relative border-2 border-white">
                        <button
                            className="absolute top-2 right-2 text-white"
                            onClick={toggleInstructions}
                        >
                            ✕
                        </button>
						<div className="text-white">
                            <h2 className="text-xl font-bold mb-4">How To Play</h2>
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
                    </div>
                </div>
            )}
        </div>
    );
}
