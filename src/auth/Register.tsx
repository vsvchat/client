import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser } from "./auth";
import PasswordInput from "./inputs/PasswordInput";
import SubmitButton from "./inputs/SubmitButton";

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
        <div className="line">
          <input
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div className="line">
          <input
            name="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>

        {/* Password */}
        <PasswordInput
          {...{ password, setPassword, showPassword, setShowPassword }}
        />

        {/* Display name */}
        <div className="line">
          <input
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Display Name"
          />
        </div>

        {/* Register button */}
        <SubmitButton
          text="Register"
          submit={register}
          loadingWhen={isLoadingUser || isLoadingLogin}
        />

        {/* Login link */}
        <div className="alternatives">
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Generic fallback error message */}
      <div className="error">{authError?.toString()}</div>
    </div>
  );
}
