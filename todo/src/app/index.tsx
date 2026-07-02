import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import TaskDetail from "../../components/TaskDetail";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Todo app</Text>
      <FlatList
        data = {[
          { key: "Task 1"},
          { key: "Task 2"},
          { key: "Task 3"},
        ]}
        renderItem={({ item }) => <TaskDetail taskId={item.key} />}
      />

      <Pressable style={styles.fab} onPress={() => router.push("/addTask")}>
        <Ionicons name="add" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
