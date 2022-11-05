import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "schemas/src/user.schema";
import { signUp } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

export default function SignUp() {
  const { setUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState("");

  const submit = async (values) => {
    try {
      const body = {
        email: values.email,
        password: values.password,
        username: values.username,
        confirmPassword: values.confirmPassword,
      };
      createUserSchema.parse(body);
      const data = await signUp(body);
      console.log(data);
      if (data.user) {
        setUser(data.user);
        window.localStorage.setItem("jwt", data.jwt);
        navigate("/");
      }
    } catch (error) {
      // If zod error
      if (error.issues) {
        setErrorText(error.issues[0].message);
        console.log(error?.issues[0]?.message);
        return;
      }
      console.log("MESSAGE: ", error.message);
      setErrorText(error.message || "Could not sign up");
    }
  };

  return (
    <>
      <Center>
        <Paper
          sx={(theme) => ({
            maxWidth: 400,
            width: "100%",
          })}
          shadow="lg"
          p="md"
          withBorder
          m="lg"
        >
          <Title order={2} align="center">
            Sign Up
          </Title>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <TextInput
              label="Email"
              type="email"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Username"
              type="text"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              type="password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              type="password"
              {...form.getInputProps("confirmPassword")}
            />
            {errorText && <Text color="red">{errorText}</Text>}
            <Center>
              <Button mt="lg" type="submit">
                Sign Up
              </Button>
            </Center>
          </form>
        </Paper>
      </Center>
    </>
  );
}
