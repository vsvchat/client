import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser } from "./auth";

// Register user page
export default function Register() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  // User input name, email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //TODO Add loading indicator

  const register = useCallback(() => {
    //TODO Add error handling
    if (!name) {
      alert("Please enter name");
    }
    registerUser(name, email, password);
  }, [name, email, password]);

  // Redirect if logged in
  useEffect(() => {
    if (loading) return; // Initial load, prevent navigate
    if (user) navigate("/"); // Navigate to main page
  }, [user, loading, navigate]);

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
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Register button */}
      <button onClick={register}>Register</button>

      {/* Login option */}
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}
