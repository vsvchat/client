import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser } from "./auth";
import UsernameInput from "./inputs/UsernameInput";
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
    if (!name) {
      setAuthError("Enter a name");
      return;
    }
    setIsLoadingLogin(true); // Start loading
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
        <UsernameInput {...{ username, setUsername }} />

        <PasswordInput
          {...{ password, setPassword, showPassword, setShowPassword }}
        />

        {/* Email */}
        <section className="EmailInput">
          <input
            name="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </section>

        {/* Display name */}
        <section>
          <input
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Display Name"
          />
        </section>

        <SubmitButton
          text="Register"
          submit={register}
          loadingWhen={isLoadingUser || isLoadingLogin}
        />

        {/* Login link */}
        <section className="alternatives">
          <Link to="/login">Login</Link>
        </section>
      </div>

      {/* Generic fallback error message */}
      <div className="error">{authError?.toString()}</div>
    </div>
  );
}
