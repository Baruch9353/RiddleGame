import { useState } from "react";

export default function AdminRiddles() {
    const [riddles, setRiddles] = useState<string[]>([]);
    const [newRiddle, setNewRiddle] = useState("");

    const addRiddle = () => {
        if (newRiddle.trim() === "") return;
        setRiddles([...riddles, newRiddle]);
        setNewRiddle("");
    };

    return (
        <div>
            <h1>Admin - Manage Riddles</h1>
            <input
                type="text"
                placeholder="Enter new riddle"
                value={newRiddle}
                onChange={(e) => setNewRiddle(e.target.value)}
            />
            <button onClick={addRiddle}>Add</button>

            <ul>
                {riddles.map((r, i) => (
                    <li key={i}>{r}</li>
                ))}
            </ul>
        </div>
    );
}
