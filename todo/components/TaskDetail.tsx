import { Text, View, StyleSheet } from "react-native";


type TaskDetailProps = {
    taskId: string;
    Description?: string;
};

export default function TaskDetail({ taskId, Description }: TaskDetailProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.taskId}>{taskId}</Text>
            {Description && <Text style={styles.description}>{Description}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    taskId: {
        fontSize: 18,
        fontWeight: "bold",
    },
});