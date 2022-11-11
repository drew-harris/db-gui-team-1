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
import { createSessionSchema } from "schemas/src/session.schema";
import { logIn } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be 8 characters long" : null,
      email: (value) => (!value ? "Email is required" : null),
    },
  });

  const [errorText, setErrorText] = useState("");

  const submit = async (values) => {
    try {
      setLoading(true);
      const body = {
        email: values.email,
        password: values.password,
      };
      createSessionSchema.parse(body);
      const data = await logIn(body);
      console.log(data);
      if (data.user) {
        setUser(data.user);
        window.localStorage.setItem("jwt", data.jwt);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      // If zod error
      if (error.issues) {
        setErrorText(error.issues[0].message);
        console.log(error?.issues[0]?.message);
      } else {
        setErrorText(error.message);
      }
      console.log(error);
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
            Log In
          </Title>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Stack>
              <TextInput
                label="Email"
                type="email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                type="password"
                {...form.getInputProps("password")}
              />
              {errorText && (
                <Text align="center" color="red">
                  {errorText}
                </Text>
              )}
              <Center>
                <Button type="submit">Log In</Button>
              </Center>
            </Stack>
          </form>
        </Paper>
      </Center>
    </>
  );
}
