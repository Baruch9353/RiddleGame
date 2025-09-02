import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Registered new user: ${username}`);
    setUsername("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
