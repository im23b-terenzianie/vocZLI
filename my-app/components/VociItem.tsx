import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { useRouter } from 'expo-router';
import Voci from "../models/voci";

export default function VociItem({ voci }: { voci: Voci }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => router.push(`/editVoci?term=${encodeURIComponent(voci.term)}` as any)}
        >
            {voci.imageUri ? (
                <Image source={{ uri: voci.imageUri }} style={styles.thumbnail} />
            ) : (
                <View style={styles.thumbnailPlaceholder} />
            )}
            <View>
                <Text style={styles.term}>{voci.term}</Text>
                <Text style={styles.translation}>{voci.translation}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: "#fff",
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    thumbnailPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
    term: {
        fontWeight: '600',
        fontSize: 15,
    },
    translation: {
        color: '#666',
        fontSize: 13,
    },
});
