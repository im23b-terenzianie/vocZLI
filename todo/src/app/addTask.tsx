import { FlatList, Text, View, StyleSheet } from "react-native";
import AddTaskDetail from "../../components/addTaskDetail";


export default function addTask() {
    return (
        <View style={styles.container}> 
        <AddTaskDetail/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});