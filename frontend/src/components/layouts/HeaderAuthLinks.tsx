import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Text, MediaQuery } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginOrSignup = () => {
  return (
    <MediaQuery
      query="(max-width: 600px) and (min-width: 1px)"
      styles={{ fontSize: 12 }}
    >
      <Group spacing={29}>
        <Text component={Link} to="/login">
          Log In
        </Text>
        <Text component={Link} to="/signup">
          Sign Up
        </Text>
      </Group>
    </MediaQuery>
  );
};

export const HeaderAuthLinks = () => {
  const { user } = useContext(AuthContext);
  return (
    <Group>
      {user ? (
        <Link to={"/profile/" + user.id}>
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
