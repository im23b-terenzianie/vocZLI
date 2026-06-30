import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void;
}

async function copyImageToAppDirectory(uri: string): Promise<string> {
    const compressed = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    const dir = FileSystem.documentDirectory + 'images/';
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    const dest = dir + Date.now() + '.jpg';
    await FileSystem.copyAsync({ from: compressed.uri, to: dest });
    return dest;
}

export default function ImagePickerButton({ imageUri, onImageSelected }: ImagePickerButtonProps) {
    const handlePick = async (useCamera: boolean) => {
        const permResult = useCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permResult.granted) {
            Alert.alert('Fehler', useCamera ? 'Kamera-Zugriff benötigt!' : 'Galerie-Zugriff benötigt!');
            return;
        }

        const result = useCamera
            ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8 })
            : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 1 });

        if (!result.canceled) {
            if (imageUri?.startsWith(FileSystem.documentDirectory ?? '')) {
                await FileSystem.deleteAsync(imageUri, { idempotent: true });
            }
            const permanentUri = await copyImageToAppDirectory(result.assets[0].uri);
            onImageSelected(permanentUri);
        }
    };

    const handlePress = () => {
        Alert.alert('Bild auswählen', '', [
            { text: 'Foto aufnehmen', onPress: () => handlePick(true) },
            { text: 'Aus Galerie wählen', onPress: () => handlePick(false) },
            { text: 'Abbrechen', style: 'cancel' },
        ]);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Bild hinzufügen</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 13,
        textAlign: 'center',
    },
});
