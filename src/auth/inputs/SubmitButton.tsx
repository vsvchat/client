import LoadingSpinner from "../../components/LoadingSpinner";
import "./SubmitButton.scss";

// Submit button for login / register
export default function SubmitButton(props: {
  text: string;
  loadingWhen: boolean;
}) {
  return (
    <section className="SubmitButton">
      <label>
        {/* Display text for button */}
        <input type="submit" value={props.text} />

        {/* Loading indicator */}
        <div className="loading">
          <span>
            <LoadingSpinner when={props.loadingWhen} />
          </span>
        </div>
      </label>
    </section>
  );
}
