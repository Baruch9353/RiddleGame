import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/" style={{ margin: "0 1rem" }}>Home</Link>
            <Link to="/login" style={{ margin: "0 1rem" }}>Login</Link>
            <Link to="/register" style={{ margin: "0 1rem" }}>Register</Link>
            <Link to="/play" style={{ margin: "0 1rem" }}>Play</Link>
            <Link to="/leaderboard" style={{ margin: "0 1rem" }}>Leaderboard</Link>
            <Link to="/admin" style={{ margin: "0 1rem" }}>Admin</Link>
        </nav>
    );
}
