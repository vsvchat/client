import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { auth, registerUser } from "./auth";

// Register user page
export default function Register() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth);

  // User input name, email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [isLoadingLogin, setIsLoadingLogin] = useState(false); // Loading login check
  const [authError, setAuthError] = useState<string | null>(null); // Login failed error

  const register = useCallback(() => {
    setIsLoadingLogin(true); // Start loading
    if (!name) {
      setAuthError("Enter a name");
      return;
    }
    registerUser(username, email, password, name).catch(err => {
      setAuthError(err); // Fallback handle: Generic error message
      setIsLoadingLogin(false); // Stop loading
    });
  }, [email, password, name, username]);

  // Redirect if logged in
  useEffect(() => {
    if (isLoadingUser) return; // Initial load, prevent navigate
    if (user) navigate("/"); // Navigate to main page
  }, [user, isLoadingUser, navigate]);

  return (
    <div className="Register auth">
      <div className="container">
        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />

        {/* Email */}
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
        />

        {/* Password */}
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        {/* Display name */}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Display Name"
        />

        {/* Show password option */}
        <input
          type="checkbox"
          onChange={e => setShowPassword(e.target.checked)}
          id="showPasswordCheckbox"
        />
        <label htmlFor="showPasswordCheckbox">Show password</label>

        {/* Register button */}
        <button onClick={register}>Register</button>

        {/* Loading indicator */}
        <LoadingSpinner when={isLoadingUser || isLoadingLogin} />

        {/* Login link */}
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Generic fallback error message */}
      <div className="error">{authError?.toString()}</div>
    </div>
  );
}
