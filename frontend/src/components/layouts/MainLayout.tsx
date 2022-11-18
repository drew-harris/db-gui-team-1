import { AppShell, Box, Group, Header, Text } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import GlobalMovieSearch from "./GlobalMovieSearch";
import { HeaderAuthLinks } from "./HeaderAuthLinks";
import { SideNav } from "./SideNav";

export const MainLayout = () => {
  return (
    <AppShell
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
            <Text component={Link} to="/" weight="bold">
              Movie Website
            </Text>
            <GlobalMovieSearch />
            <Group>
              <HeaderAuthLinks />
              <ThemeToggle />
            </Group>
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
