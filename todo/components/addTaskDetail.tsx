import { Text, View, StyleSheet, TextInput, Pressable} from "react-native";
import 


export default function AddTaskDetail() {
    return (
        <View style={styles.container}>
            <Text>Add Task</Text>
            <TextInput style={styles.input} placeholder="Task Name" />
            <TextInput style={styles.input} placeholder="Task Description" />
            <Pressable style={styles.saveButton} onPress={/* Handle save task logic here */}>
                <Text>Save Task</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        margin: 10,
        width: "80%",
    },
    saveButton: {
        backgroundColor: "blue",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
});