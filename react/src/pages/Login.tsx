import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.username && payload.role) {
                    setRole(payload.role);
                    setLoggedIn(true);
                    setMessage(`Welcome back, ${payload.username}!`);
                }
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const res = await fetch("http://localhost:3000/players/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok) {
                setLoggedIn(true);
                setRole(data.role);
                setMessage(`Logged in as ${data.role}`);
                if (data.token) localStorage.setItem("token", data.token);
            } else {
                setError(data.message || "Invalid username or password");
            }

            setUsername("");
            setPassword("");
        } catch {
            setError("An error occurred while logging in");
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>

            {loggedIn && (
                <div>
                    <p style={{ color: "green" }}>{message}</p>
                    <Link to="/play"><button>Play</button></Link>
                    <Link to="/leaderboard"><button>Leaderboard</button></Link>
                    {role === "admin" && <Link to="/admin"><button>Admin Riddles</button></Link>}
                </div>
            )}
        </div>
    );
}
