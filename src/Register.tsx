import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) {
      //TODO Loading screen
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="Register">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={register}>Register</button>

      <div>
        Already have an account? <Link to="/">Login</Link> now.
      </div>
    </div>
  );
}
