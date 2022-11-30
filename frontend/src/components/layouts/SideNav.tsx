import {
  faEnvelope,
  faHome,
  faList,
  faPencil,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, NavLink } from "@mantine/core";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const SideNav = ({ opened, setOpened }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const links = [
    {
      to: "/",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHome} />,
      authOnly: false,
    },
    {
      to: "/profile/" + user?.id + "/lists",
      label: "My Lists",
      icon: <FontAwesomeIcon icon={faList} />,
      authOnly: true,
    },
    {
      to: "/profile/" + user?.id + "/reviews",
      label: "My Reviews",
      icon: <FontAwesomeIcon icon={faPencil} />,
      authOnly: true,
    },
    {
      to: "/profile/" + user?.id + "/ratings",
      label: "My Ratings",
      icon: <FontAwesomeIcon icon={faStar} />,
      authOnly: true,
    },
    {
      to: "/profile/" + user?.id,
      label: "My Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      authOnly: true,
    },
    {
      to: "/profiles/",
      label: "All Users",
      icon: <FontAwesomeIcon icon={faUser} />,
      authOnly: false,
    },
    {
      to: "/movierequests",
      label: "Movie Requests",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      authOnly: true,
    },
  ];
  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;
  return (
    <Navbar width={{ sm: 200, lg: 300 }} hidden={!opened} withBorder p="xs">
      {links.map((link) => {
        if (link.authOnly && !user) {
          return null;
        }
        return (
          <NavLink
            onClick={() => setOpened(false)}
            icon={link.icon}
            key={link.to}
            label={link.label}
            component={Link}
            to={link.to}
          />
        );
      })}
    </Navbar>
  );
};
