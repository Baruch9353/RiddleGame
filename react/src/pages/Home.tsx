import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>Riddle Game</h1>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/play">
          <button>play as guest</button>
        </Link>
      </div>
    </div>
  );
}
