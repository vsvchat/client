import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (!user) {
        navigate("/login");
      }
    });
  }, [currentUser, navigate]);

  return (
    <div className="Dashboard">
      Logged in as
      <div>Email: {currentUser?.email || "[?]"}</div>
      <button onClick={logout}>Logout</button>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
}
