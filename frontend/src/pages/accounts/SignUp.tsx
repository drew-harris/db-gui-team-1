import {
  Button,
  Center,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
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
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be 8 characters long" : null,
      email: (value) => (!value ? "Email is required" : null),
      confirmPassword: (value, others) =>
        value !== others.password || !value ? "Passwords must match" : null,
      username: (value) => (!value ? "Username is required" : null),
    },
  });
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState("");

  const submit = async (values) => {
    try {
      setLoading(true);
      const body = {
        email: values.email,
        password: values.password,
        username: values.username,
        passwordConfirmation: values.confirmPassword,
      };
      createUserSchema.parse(body);
      const data = await signUp(body);

      if (data.user) {
        setUser(data.user);
        window.localStorage.setItem("jwt", data.jwt);
        navigate("/");
      }
    } catch (error) {
      // If zod error
      setLoading(false);
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
            position: "relative",
          })}
          shadow="lg"
          p="md"
          withBorder
          m="lg"
        >
          <LoadingOverlay visible={loading} />
          <Title order={2} align="center">
            Sign Up
          </Title>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Stack>
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
              {errorText && (
                <Text align="center" color="red">
                  {errorText}
                </Text>
              )}
              <Center>
                <Button type="submit">Sign Up</Button>
              </Center>
            </Stack>
          </form>
        </Paper>
      </Center>
    </>
  );
}
