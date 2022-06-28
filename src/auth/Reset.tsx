import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { auth, resetPassword } from "./auth";
import "./auth.scss";

// Reset password page
export default function Reset() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth); // User data (to check already logged in)

  const [email, setEmail] = useState(""); // User input email

  const [isLoadingReset, setIsLoadingReset] = useState<boolean | 0>(false); // Loading send email (0 for success)
  const [error, setError] = useState<string | null>(null); // Error

  // On click reset button
  const reset = useCallback(() => {
    setIsLoadingReset(true);
    setError(null);
    resetPassword(email)
      .then(() => {
        setIsLoadingReset(0);
      })
      .catch(err => {
        setIsLoadingReset(false);
        setError(err?.toString());
      });
  }, [email]);

  // Navigate if already logged in
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="Reset authContainer">
      {/* Email
        //TODO Add validation before API
       */}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Address"
      />

      {/* Send reset email button */}
      <button onClick={reset}>Send password reset email</button>

      {/* Loading indicator */}
      <LoadingSpinner when={!!isLoadingReset} />
      {/* Message when sent */}
      <span>{isLoadingReset === 0 ? "Sent!" : null}</span>

      {/* Error */}
      <span className="error">{error}</span>

      {/* Login or register link */}
      <div>
        <Link to="/">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
