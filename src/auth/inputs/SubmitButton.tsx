import { MouseEventHandler } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./SubmitButton.scss";

// Submit button for login / register
export default function SubmitButton(props: {
  text: string;
  submit: MouseEventHandler<HTMLButtonElement>;
  loadingWhen: boolean;
}) {
  return (
    <section className="SubmitButton">
      <button onClick={props.submit}>
        {/* Display text for button */}
        <span className="text">{props.text}</span>

        {/* Loading indicator */}
        <div className="loading">
          <span>
            <LoadingSpinner when={props.loadingWhen} />
          </span>
        </div>
      </button>
    </section>
  );
}
