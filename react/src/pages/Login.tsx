import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload?.username && payload?.role) {
                    setRole(payload.role);
                    setLoggedIn(true);
                    setMessage(`Welcome back ${payload.username}🤗 (${payload.role})`);
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
                setMessage(`Logged in as ${data.username} (${data.role})`);
                if (data.token) localStorage.setItem("token", data.token);
            } else setError(data.message || "Invalid username or password");
            setUsername("");
            setPassword("");
        } catch {
            setError("Error logging in");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setRole("");
        setMessage("");
        navigate("/login");
    };

    return (
        <div>
            {!loggedIn ? (
                <form onSubmit={submit}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <Link to="/play"><button>Play</button></Link>
                    <Link to="/leaderboard"><button>Leaderboard</button></Link>
                    {role === "admin" && <Link to="/admin"><button>Admin Riddles</button></Link>}
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}
