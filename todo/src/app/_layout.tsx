import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Todo App" }} />
      <Stack.Screen name="addTask" options={{ title: "Add Task" }} />
    </Stack>
  );
}
