import { AppShell, Box, Group, Header, Text } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import GloablMovieSearch from "./GlobalMovieSearch";
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
            {/* TODO: figure out the proper way to do this */}
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Text weight="bold">Movie Website</Text>
            </Link>
            <GloablMovieSearch />
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
