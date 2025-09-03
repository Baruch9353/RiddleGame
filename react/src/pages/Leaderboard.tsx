import { useEffect, useState } from "react";

interface Player {
    id: string;
    username: string;
    lowestTime?: number;
}

export default function Leaderboard() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch("http://localhost:3000/players");
                const data: Player[] = await res.json();
                const filtered = data.filter(player => player.lowestTime !== null);
                filtered.sort((a, b) => a.lowestTime! - b.lowestTime!);
                setPlayers(filtered);
            } catch (err) {
                console.error("Failed to fetch players:", err);
            }
        };
        fetchPlayers();
    }, []);

    return (
        <div>
            <p>Leader board</p>
            <ol>
                {players.map(player => (
                    <li key={player.id}>
                        {player.username} - {player.lowestTime}s
                    </li>
                ))}
            </ol>
        </div>
    );
}
