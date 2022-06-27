import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, resetPassword } from "./auth";

// Reset password page
export default function Reset() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth); // User data (to check already logged in)
  const [email, setEmail] = useState(""); // User input email

  // Navigate if logged in
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="Reset">
      {/* Email */}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Address"
      />

      {/* Send reset email button */}
      <button onClick={() => resetPassword(email)}>
        Send password reset email
      </button>

      {/* Login or register */}
      <div>
        <Link to="/">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
