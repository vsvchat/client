import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginUser } from "./auth";
import LoadingSpinner from "../components/LoadingSpinner";
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
    <div className="Login authContainer">
      {/* Username */}
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />

      {/* Password */}
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Show password option */}
      <input
        type="checkbox"
        onChange={e => setShowPassword(e.target.checked)}
        id="showPasswordCheckbox"
      />
      <label htmlFor="showPasswordCheckbox">Show password</label>

      {/* Login button */}
      <button onClick={login}>Login</button>

      {/* Loading indicator */}
      <LoadingSpinner when={isLoadingUser || isLoadingLogin} />

      {/* Register link */}
      <div>
        <Link to="/register">Register</Link>
      </div>

      {/* Forgot password link */}
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>

      {/* Generic fallback error message */}
      <pre className="error">{authError?.toString()}</pre>
    </div>
  );
}
