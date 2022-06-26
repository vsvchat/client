import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //TODO Loading screen
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="Reset">
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />

      <button onClick={() => sendPasswordReset(email)}>
        Send password reset email
      </button>

      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
}
