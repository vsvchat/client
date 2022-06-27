import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";

// Main app page
export default function App() {
  // Fetch test message from server
  const [testMsg, setTestMsg] = useState<string | null>(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL!)
      .then(res => res.blob())
      .then(blob => blob.text())
      .then(text => {
        setTestMsg(text);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <h1>VSV Chat</h1>
      <p>Backend says: {testMsg || "..."}</p>

      {/* Use routes from index.tsx */}
      <Outlet />
    </div>
  );
}
