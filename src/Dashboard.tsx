import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logoutUser, getName } from "./auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Dashboard when logged in
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data
  const [name, setName] = useState<string | null>(null);

  // On click logout button
  const logout = useCallback(() => {
    if (window.confirm("Are you sure?")) {
      // Confirm
      logoutUser();
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (isLoadingUser) return; // Initial load, prevent navigate
    if (!user) navigate("/login"); // Navigate to login page
    (async () => {
      setName(await getName(user)); // Get display name
    })();
  }, [user, navigate, isLoadingUser]);

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>

      <p>
        Hello, {name || "[name]"}!
        <br />
        Email: {user?.email || "[email]"}
      </p>

      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      {/* Loading indicator */}
      {isLoadingUser ? <span>Loading...</span> : null}

      {/* All user data (debug) */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
