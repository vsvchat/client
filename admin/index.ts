import { deleteUsersAndDocs, registerUser } from "./methods";
import readline from "readline";

type option = { name: string; method: () => void };
const options: option[] = [
  {
    name: "Delete all users",
    method: deleteUsersAndDocs,
  },
  {
    name: "Register new user",
    method: () => {
      return new Promise<void>(async resolve => {
        registerUser(
          await input("Username: "),
          await input("Email: "),
          await input("Password: "),
          await input("Display name: "),
        );
        resolve();
      });
    },
  },
];

async function main() {
  while (true) {
    console.log("\nSelect:");
    console.log(options.map((e, i) => `  [${i}] ${e.name}`).join("\n"));

    const option = parseInt(await input("> "));
    console.log();
    if (isNaN(option) || option < 0 || option >= options.length) {
      console.log("Invalid option");
      continue;
    }

    console.log("<<<");
    await options[option].method();
    console.log(`>>> Finished option [${option}]`);
  }
}
main();

function input(prompt: string) {
  return new Promise<any>(resolve => {
    process.stdout.write(prompt);
    const rl = readline.createInterface(process.stdin, null);
    rl.question(prompt, res => {
      resolve(res);
      rl.close();
    });
  });
}
