import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginOrSignup = () => {
  return (
    <Group spacing={29}>
      <Text component={Link} to="/login">
        Log In
      </Text>
      <Text component={Link} to="/signup">
        Sign Up
      </Text>
    </Group>
  );
};

export const HeaderAuthLinks = () => {
  const { user } = useContext(AuthContext);
  return (
    <Group>
      {user ? (
        <Link to="/account">
          <ActionIcon variant="filled" p="xs" radius="xl">
            <FontAwesomeIcon icon={faUser} />
          </ActionIcon>
        </Link>
      ) : (
        <>
          <LoginOrSignup />
        </>
      )}
    </Group>
  );
};
