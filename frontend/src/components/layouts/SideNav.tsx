import {
  faHome,
  faList,
  faPencil,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    to: "/",
    label: "Home",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    to: "/my-lists",
    label: "My Lists",
    icon: <FontAwesomeIcon icon={faList} />,
  },
  {
    to: "/",
    label: "My Reviews",
    icon: <FontAwesomeIcon icon={faPencil} />,
  },
  {
    to: "/",
    label: "My Ratings",
    icon: <FontAwesomeIcon icon={faStar} />,
  },
  {
    to: "/account",
    label: "My Account",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];

export const SideNav = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;
  return (
    <Navbar width={{ base: 240 }} withBorder p="xs">
      {links.map((link) => (
        <NavLink
          icon={link.icon}
          key={link.to}
          label={link.label}
          component={Link}
          to={link.to}
        />
      ))}
    </Navbar>
  );
};
