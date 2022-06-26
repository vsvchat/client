import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import "./App.scss";

export default function App() {
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
      <h1>VSV Chat</h1>
      <p>Test: {testMsg || "..."}</p>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<h1>Coming soon...</h1>} />
          <Route path="*" element={<h1>404!!!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
