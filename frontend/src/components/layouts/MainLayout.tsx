import { AppShell, Box, Group, Header, Text } from "@mantine/core";
import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HeaderAuthLinks } from "./HeaderAuthLinks";
import { SideNav } from "./SideNav";

const LoginOrSignup = () => {
  return (
    <div className="flex gap-8 font-bold">
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export const MainLayout = () => {
  const location = useLocation();
  return (
    <AppShell
      hidden={location.pathname === "/login" || location.pathname === "/signup"}
      navbar={<SideNav />}
      header={
        <Header height={60} withBorder>
          <Group
            position="apart"
            mx="md"
            align="center"
            p="xs"
            sx={{ height: "100%" }}
          >
            <Text weight="bold">Movie Website</Text>
            <HeaderAuthLinks />
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Box p="md">
        <Outlet />
      </Box>
    </AppShell>
  );
};
