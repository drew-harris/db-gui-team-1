import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "schemas/src/user.schema";
import { signUp } from "../../api/auth";
import Button from "../../components/inputs/Button";
import Input from "../../components/inputs/Input";
import { AuthContext } from "../../context/AuthContext";

export default function SignUp() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
  }, [email, password]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
        username,
        passwordConfirmation: confirmPassword,
      };
      createUserSchema.parse(body);
      const data = await signUp(body);
      console.log(data);
      if (data.user) {
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      // If zod error
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
            label="Username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {errorText && <div className="text-red-500">{errorText}</div>}
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}
