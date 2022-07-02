import { Dispatch, SetStateAction } from "react";

// Username input field
export default function UsernameInput(props: {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section>
      <input
        name="username"
        type="text"
        value={props.username}
        onChange={e => props.setUsername(e.target.value)}
        placeholder="Username"
        required
      />
    </section>
  );
}
