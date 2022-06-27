import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logoutUser } from "./auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Dashboard when logged in
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data

  // On click logout button
  const logout = useCallback(() => {
    if (window.confirm("Are you sure?")) {
      // Confirm
      logoutUser();
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login"); // Navigate to login page
  }, [user, navigate]);

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>

      <p>Hello, {user?.email || "[unknown user]"}!</p>

      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      {/* Loading indicator */}
      {isLoadingUser ? <span>Loading...</span> : null}

      {/* All user data (debug) */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
