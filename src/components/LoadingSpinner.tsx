import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./LoadingSpinner.scss";

// Spinner for loading
export default function LoadingSpinner(props: { when: boolean }) {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className="LoadingSpinner"
      style={{ display: props.when ? "initial" : "none" }}
    />
  );
}
