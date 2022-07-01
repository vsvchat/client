import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, resetPassword } from "./firebase";
import "./auth.scss";
import EmailInput from "./inputs/EmailInput";
import SubmitButton from "./inputs/SubmitButton";

// Reset password page
export default function Reset() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data (to check already logged in)

  const [email, setEmail] = useState(""); // User input email

  const [isLoadingSent, setIsLoadingSend] = useState<boolean | 0>(false); // Loading send email (0 for success)
  const [authError, setAuthError] = useState<string | null>(null); // Error

  // On click reset button
  const sendReset = useCallback(() => {
    setIsLoadingSend(true);
    setAuthError(null);
    resetPassword(email)
      .then(() => {
        setIsLoadingSend(0);
      })
      .catch(err => {
        setIsLoadingSend(false);
        setAuthError(err?.toString());
      });
  }, [email]);

  // Navigate if already logged in
  useEffect(() => {
    if (isLoadingUser) return;
    if (user) navigate("/");
  }, [user, isLoadingUser, navigate]);

  return (
    <div className="Forgot auth">
      <div className="container">
        <EmailInput {...{ email, setEmail }} />

        <SubmitButton
          text={isLoadingSent === 0 ? "Sent!" : "Send reset email"}
          submit={sendReset}
          loadingWhen={isLoadingUser || !!isLoadingSent}
        />

        {/* Login, register links */}
        <section className="alternatives">
          <Link to="/login">Log in</Link>

          <Link to="/register">Register</Link>
        </section>
      </div>

      {/* Generic fallback error message */}
      <div className="error">{authError?.toString()}</div>
    </div>
  );
}
