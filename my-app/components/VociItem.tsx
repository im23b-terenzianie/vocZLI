import { Text, View, StyleSheet } from "react-native";
import Voci from "../models/voci";


export default function VociItem({ voci }: { voci: Voci }) {
    return (
        <View style={styles.container}>
            <Text>{voci.term} - {voci.translation}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});