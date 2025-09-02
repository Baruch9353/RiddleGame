import { Link } from "react-router";

export default function Header() {
    return (
        <nav>
            <Link to="/"><button>Home</button></Link>
            <button>Logout</button>
        </nav>
    );
}
