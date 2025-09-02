import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false); // מצב מחובר

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(`Logging in as: ${username}`);
        setUsername("");
        setLoggedIn(true);
    };

    return (
        <div>
            {!loggedIn ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <Link to="/play">
                        <button>play</button>
                    </Link>
                    <Link to="/leaderboard">
                        <button>Leaderboard</button>
                    </Link>
                    <Link to="/admin">
                        <button>Admin Riddles</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
