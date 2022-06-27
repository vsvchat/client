import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="NotFound">
      <h1>404 - Not Found</h1>
      <h2>:(</h2>
      <Link to="/">Back to main page</Link>
    </div>
  );
}
