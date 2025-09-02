import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <Link to="/"><button>Home</button></Link>
            <button>Logout</button>
        </nav>
    );
}
