import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginUser } from "./auth";
import "./auth.scss";

// Login user page
export default function Login() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data (to validate login)

  // User input email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoadingLogin, setIsLoadingLogin] = useState(false); // Loading login check
  const [authError, setAuthError] = useState<string | null>(null); // Login failed error

  // On click login button
  const login = useCallback(() => {
    setIsLoadingLogin(true); // Start loading
    // Attempt login
    loginUser(email, password).catch(err => {
      //TODO Proper error handling
      setAuthError(err); // Fallback handle: Generic error message
      setIsLoadingLogin(false); // Stop loading
    });
  }, [email, password, setIsLoadingLogin]);

  // Redirect on successful login
  useEffect(() => {
    if (isLoadingUser) return; // Initial load, prevent navigate
    if (user) navigate("/"); // Navigate to main page
  }, [user, isLoadingUser, navigate]);

  return (
    <div className="Login authContainer">
      {/* Email */}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Address"
      />

      {/* Password
        //TODO Add 'show password option' 
      */}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Login button */}
      <button onClick={login}>Login</button>

      {/* Loading indicator */}
      {isLoadingUser || isLoadingLogin ? <span>Loading...</span> : null}

      {/* Forgot password option */}
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>

      {/* Register option */}
      <div>
        <Link to="/register">Register</Link>
      </div>

      {/* Generic fallback error message */}
      <pre className="error">{authError?.toString()}</pre>
    </div>
  );
}
