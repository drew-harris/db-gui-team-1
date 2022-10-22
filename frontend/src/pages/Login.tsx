import { useState, useEffect } from "react";
import Button from "../components/inputs/Button";
import Input from "../components/inputs/Input";
import { createSessionSchema } from "schemas";
import { ZodError } from "zod";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
  }, [email, password]);

  const submit = (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      createSessionSchema.parse(body);
    } catch (error) {
      if (error.issues) {
        setErrorText(error.issues[0].message);
        console.log(error?.issues[0]?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="h-[90vh] grid place-items-center">
      <div className="bg-slate-800 p-8 shadow rounded border border-slate-500">
        <h2 className="font-bold text-center mb-3 text-xl">Log In</h2>
        <form className="flex flex-col gap-2" onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errorText && <div className="text-red-500">{errorText}</div>}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
