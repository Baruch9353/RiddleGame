import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // סיסמה
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(`Logged in as: ${username}`);
        setLoggedIn(true); // מסמן שנכנס
        setUsername("");
        setPassword("");
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
                    <br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <Link to="/play">
                        <button>Play</button>
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
