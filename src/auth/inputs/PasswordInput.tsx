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
    <div className="PasswordInput line">
      {/* Password input */}
      <input
        name="password"
        type={props.showPassword ? "text" : "password"}
        value={props.password}
        onChange={e => props.setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Show password option */}
      <label className="showPassword" title="Show password">
        <input
          name="showPassword"
          type="checkbox"
          checked={props.showPassword}
          onChange={e => props.setShowPassword(e.target.checked)}
        />
        <div className="icon">
          <span className={props.showPassword ? "show" : undefined}>
            <FontAwesomeIcon icon={props.showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
      </label>
    </div>
  );
}
