import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, Group } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
          <Button>Sign In</Button>
        </>
      )}
    </Group>
  );
};
