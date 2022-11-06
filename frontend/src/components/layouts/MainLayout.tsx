import { AppShell, Box, Group, Header, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
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
