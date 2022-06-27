import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser } from "./auth";

// Register user page
export default function Register() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth);

  // User input name, email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false); // Loading login check
  const [authError, setAuthError] = useState<string | null>(null); // Login failed error

  const register = useCallback(() => {
    setIsLoadingLogin(true); // Start loading
    if (!name) {
      setAuthError("Enter a name");
      return;
    }
    registerUser(name, email, password).catch(err => {
      setAuthError(err); // Fallback handle: Generic error message
      setIsLoadingLogin(false); // Stop loading
    });
  }, [name, email, password]);

  // Redirect if logged in
  useEffect(() => {
    if (isLoadingUser) return; // Initial load, prevent navigate
    if (user) navigate("/"); // Navigate to main page
  }, [user, isLoadingUser, navigate]);

  return (
    <div className="Register authContainer">
      {/* Display name */}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Full Name"
      />

      {/* Email */}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />

      {/* Password
        //TODO Add 'show password option' 
       */}
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
      />
      <label>Show password</label>

      {/* Register button */}
      <button onClick={register}>Register</button>

      {/* Loading indicator */}
      {isLoadingUser || isLoadingLogin ? <span>Loading...</span> : null}

      {/* Login option */}
      <div>
        <Link to="/">Login</Link>
      </div>

      {/* Generic fallback error message */}
      <pre className="error">{authError?.toString()}</pre>
    </div>
  );
}
