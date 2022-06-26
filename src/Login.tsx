import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //TODO Loading screen
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="Login">
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={() => logInWithEmailAndPassword(email, password)}>
        Login
      </button>

      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>

      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
}
