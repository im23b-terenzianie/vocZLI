import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Voci from '../models/voci';
import ImagePickerButton from './ImagePickerButton';

interface VociDetailProps {
    onSave: (voci: Voci) => void;
    onCancel?: () => void;
    onDelete?: () => void;
    initialVoci?: Voci;
}

export default function VociDetail({ onSave, onCancel, onDelete, initialVoci }: VociDetailProps) {
    const [term, setTerm] = useState(initialVoci?.term ?? '');
    const [translation, setTranslation] = useState(initialVoci?.translation ?? '');
    const [imageUri, setImageUri] = useState<string | undefined>(initialVoci?.imageUri);

    const isEditMode = !!initialVoci;

    const handleSave = () => {
        if (!term.trim() || !translation.trim()) {
            Alert.alert('Fehler', 'Bitte beide Felder ausfüllen.');
            return;
        }
        onSave({ term: term.trim(), translation: translation.trim(), imageUri });
        if (!isEditMode) {
            setTerm('');
            setTranslation('');
            setImageUri(undefined);
        }
    };

    const handleDelete = () => {
        Alert.alert('Löschen', `Möchten Sie "${term}" wirklich löschen?`, [
            { text: 'Abbrechen', style: 'cancel' },
            { text: 'Löschen', style: 'destructive', onPress: onDelete },
        ]);
    };

    return (
        <View style={styles.container}>
            <ImagePickerButton imageUri={imageUri} onImageSelected={setImageUri} />
            <Text style={styles.label}>Begriff</Text>
            <TextInput style={styles.input} value={term} onChangeText={setTerm} placeholder="z.B. der Hund" />
            <Text style={styles.label}>Übersetzung</Text>
            <TextInput style={styles.input} value={translation} onChangeText={setTranslation} placeholder="z.B. the dog" />
            <View style={styles.buttonRow}>
                <Button title="Speichern" onPress={handleSave} />
            </View>
            {isEditMode && onCancel && (
                <View style={styles.buttonRow}>
                    <Button title="Abbrechen" onPress={onCancel} />
                </View>
            )}
            {isEditMode && onDelete && (
                <View style={styles.buttonRow}>
                    <Button title="Löschen" color="red" onPress={handleDelete} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
    buttonRow: {
        marginTop: 12,
    },
});
