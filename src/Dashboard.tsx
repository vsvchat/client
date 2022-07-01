import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logoutUser, getUserData } from "./auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData } from "firebase/firestore";

// Dashboard when logged in
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, isLoadingUser] = useAuthState(auth); // User data
  const [userData, setUserData] = useState<DocumentData | null>(null);

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
    if (user?.uid) {
      getUserData(user).then(res => {
        setUserData(res);
      });
    }
  }, [user, navigate, isLoadingUser]);

  return (
    <div className="Dashboard">
      <p>
        Hello, {userData?.name || "..."}!
        <br />
        Email: {user?.email || "..."}
        <br />
        UID: {user?.uid || "..."}
        <br />
      </p>
      User data:
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {/* Logout button */}
      <button onClick={logout}>Logout</button>
      {/* Loading indicator */}
      {isLoadingUser ? <span>Loading...</span> : null}
    </div>
  );
}
