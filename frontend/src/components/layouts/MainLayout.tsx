import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppShell,
  Box,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import GlobalMovieSearch from "./GlobalMovieSearch";
import { HeaderAuthLinks } from "./HeaderAuthLinks";
import { SideNav } from "./SideNav";

export const MainLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<SideNav opened={opened} setOpened={setOpened} />}
      header={
        <Header height={60} withBorder>
          <Group
            position="apart"
            mx="md"
            align="center"
            p="xs"
            sx={{ height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <MediaQuery query="(max-width: 600px)" styles={{ fontSize: 12 }}>
              <Group spacing={6}>
                <FontAwesomeIcon icon={faFilm}></FontAwesomeIcon>
                <Text component={Link} to="/" weight="bold" size="lg">
                  flickaid
                </Text>
              </Group>
            </MediaQuery>
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
