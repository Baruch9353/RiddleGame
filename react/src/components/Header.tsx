import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <Link to="/">Home ~ </Link>
            <Link to="/login">Login ~ </Link>
            <Link to="/register">Register ~ </Link>
            <Link to="/play">Play ~ </Link>
            <Link to="/leaderboard">Leaderboard ~ </Link>
            <Link to="/admin">Admin ~ </Link>
        </nav>
    );
}
