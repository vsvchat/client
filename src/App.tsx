import { useEffect, useState } from "react";
import "./App.scss";

export default function App() {
  const [testMsg, setTestMsg] = useState<string | null>(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_API!)
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
    </div>
  );
}
