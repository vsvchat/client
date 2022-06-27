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

    // Get display name
    (async () => {
      if (user?.uid) {
        setName(await getName(user));
      }
    })();
  }, [user, navigate, isLoadingUser]);

  return (
    <div className="Dashboard">
      <p>
        Hello, {name || "..."}!
        <br />
        Email: {user?.email || "..."}
        <br />
        UID: {user?.uid || "..."}
      </p>

      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      {/* Loading indicator */}
      {isLoadingUser ? <span>Loading...</span> : null}
    </div>
  );
}
