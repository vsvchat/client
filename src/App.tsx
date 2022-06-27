import { Outlet } from "react-router-dom";
import "./App.scss";

// Main app page
export default function App() {
  return (
    <div className="App">
      {/* Header */}
      <h1>VSV Chat</h1>

      {/* Use routes from index.tsx */}
      <Outlet />
    </div>
  );
}
