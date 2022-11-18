import { Paper, Stack, Text } from "@mantine/core";

export const DataSquare = ({
  label,
  value,
  lowerLabel = null,
  onClick = null,
}) => {
  return (
    <Paper
      sx={(theme) => ({
        cursor: onClick ? "pointer" : undefined,
      })}
      radius="md"
      withBorder
      py="sm"
      px="md"
      onClick={onClick}
    >
      <Stack align="center" spacing={0}>
        <Text size="lg" weight="bold">
          {label}
        </Text>
        <Text>{value}</Text>
        <Text>{lowerLabel}</Text>
      </Stack>
    </Paper>
  );
};
