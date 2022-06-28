import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginUser } from "./auth";
import UsernameInput from "./inputs/UsernameInput";
import PasswordInput from "./inputs/PasswordInput";
import SubmitButton from "./inputs/SubmitButton";
import "./auth.scss";

// Login user page
export default function Login() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data (to validate login)

  // User input email and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false); // Loading login check
  const [authError, setAuthError] = useState<string | null>(null); // Login failed error

  // On click login button
  const login = useCallback(() => {
    setIsLoadingLogin(true); // Start loading
    // Attempt login
    loginUser(username, password).catch(err => {
      //TODO Proper error handling
      setAuthError(err); // Fallback handle: Generic error message
      setIsLoadingLogin(false); // Stop loading
    });
  }, [username, password, setIsLoadingLogin]);

  // Redirect on successful login
  useEffect(() => {
    if (isLoadingUser) return; // Initial load, prevent navigate
    if (user) navigate("/"); // Navigate to main page
  }, [user, isLoadingUser, navigate]);

  return (
    <div className="Login auth">
      <div className="container">
        <UsernameInput {...{ username, setUsername }} />

        <PasswordInput
          {...{ password, setPassword, showPassword, setShowPassword }}
        />

        <SubmitButton
          text="Login"
          submit={login}
          loadingWhen={isLoadingUser || isLoadingLogin}
        />

        {/* Register, forgot password links */}
        <section className="alternatives">
          <Link to="/register">Register</Link>

          <Link to="/forgot">Forgot Password</Link>
        </section>

        {/* Generic fallback error message */}
        <div className="error">{authError?.toString()}</div>
      </div>
    </div>
  );
}
