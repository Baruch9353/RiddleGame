import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Registered new user: ${username}`);
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Choose username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
