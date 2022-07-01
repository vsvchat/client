import { Dispatch, SetStateAction } from "react";
import "./PasswordInput.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Password input field
export default function PasswordInput(props: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className="PasswordInput">
      {/* Password input */}
      <input
        name="password"
        type={props.showPassword ? "text" : "password"}
        value={props.password}
        onChange={e => props.setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {/* Show password option */}
      <div className="showPasswordContainer">
        <label className="showPassword" title="Show password">
          <input
            name="showPassword"
            type="checkbox"
            checked={props.showPassword}
            onChange={e => props.setShowPassword(e.target.checked)}
          />
          <div className={(props.showPassword ? "show " : "") + "icon"}>
            <FontAwesomeIcon icon={props.showPassword ? faEye : faEyeSlash} />
          </div>
        </label>
      </div>
    </section>
  );
}
