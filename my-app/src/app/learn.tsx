import React from 'react';
import { Text, View, StyleSheet, Button, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { useVoci } from '../../context/vociContext';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#091096',
        borderRadius: 10,
        padding: 20,
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    term: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    translation: {
        fontSize: 18,
        textAlign: 'center',
    },
    rightbutton: {
        backgroundColor: 'green',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    falsebutton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default function LearnScreen() {
    const { vociList } = useVoci();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showTranslation, setShowTranslation] = React.useState(false);
    const [rightAnswers, setRightAnswers] = React.useState(0);
    const [wrongAnswers, setWrongAnswers] = React.useState(0);

    React.useEffect(() => {
        if (currentIndex >= vociList.length) {
            router.push("/");
        }
    }, [currentIndex]);

    if (currentIndex >= vociList.length) {
        return null;
    }
    const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
        setShowTranslation(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {vociList[currentIndex].imageUri && (
                    <Image source={{ uri: vociList[currentIndex].imageUri }} style={styles.image} resizeMode="cover" />
                )}
                <Text style={styles.term}>{vociList[currentIndex].term}</Text>
                {showTranslation && <Text style={styles.translation}>{vociList[currentIndex].translation}</Text>}
                {!showTranslation && (
                    <Button title="Übersetzung anzeigen" onPress={() => {
                        setShowTranslation(true);
                    }}>
                    </Button>
                )}
                {showTranslation && (
                    <View>
                        <Pressable style={styles.rightbutton} onPress={() => {
                            handleNext();
                            setRightAnswers(rightAnswers + 1);
                        }}>
                            <Text>Gewusst</Text>
                        </Pressable>
                        <Pressable style={styles.falsebutton} onPress={() => {
                            handleNext();
                            setWrongAnswers(wrongAnswers + 1);
                        }}>
                            <Text>Nicht gewusst</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}