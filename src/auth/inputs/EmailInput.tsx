import { Dispatch, SetStateAction } from "react";

// Email input field
export default function Emailinput(props: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section className="EmailInput">
      <input
        type="email"
        value={props.email}
        onChange={e => props.setEmail(e.target.value)}
        placeholder="Email Address"
        required
      />
    </section>
  );
}
