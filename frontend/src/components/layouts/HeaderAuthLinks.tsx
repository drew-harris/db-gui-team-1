import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, Group } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginOrSignup = () => {
  return (
    <div className="flex gap-8 font-bold">
      <Button>
        <Link to="/login">Log In</Link>
      </Button>
      <Button>
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
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
