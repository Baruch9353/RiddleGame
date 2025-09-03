import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [error, setError] = useState(""); // 💡 הודעת שגיאה

    // Check after page load: If there is a token, logged in and role is set
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setRole(payload.role);
                setLoggedIn(true);
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 
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
                const errorMsg = data.message || "Invalid username or password";
                setError(errorMsg);
            }

            setUsername("");
            setPassword("");
        } catch (err: any) {
            setError("An error occurred while logging in");
        }
    };

    return (
        <div>
            {!loggedIn ? (
                <form onSubmit={submit}>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
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
