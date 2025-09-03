import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminCode, setAdminCode] = useState("");
    const [message, setMessage] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/players/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, adminCode }),
            });
            const data = await res.json();
            setMessage(res.ok ? `Registered as ${data.role}` : `Error: ${data.message}`);
            setUsername(""); setPassword(""); setAdminCode("");
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                <input value={adminCode} onChange={e => setAdminCode(e.target.value)} placeholder="Admin Code (optional)" />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message} <Link to="/login">Login</Link></p>}
        </div>
    );
}
