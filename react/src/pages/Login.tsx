import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            } else {
                setMessage(`Error: ${data.message}`);
            }
            setUsername(""); setPassword("");
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            {!loggedIn ? (
                <form onSubmit={submit}>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <Link to="/play"><button>Play</button></Link>
                    <Link to="/leaderboard"><button>Leaderboard</button></Link>
                    {role === "admin" && <Link to="/admin"><button>Admin Riddles</button></Link>}
                </div>
            )}
        </div>
    );
}
