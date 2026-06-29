import { Text, View, StyleSheet, FlatList, Pressable, Button } from "react-native";
import Voci from "../../models/voci";
import VociItem from "../../components/VociItem";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useVoci } from "../../context/vociContext";

export default function Index() {
  const router = useRouter();
  const vociList: Voci[] = useVoci().vociList;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VocZLI</Text>
      <Text style={styles.subtitle} >Meine Vokabel-Lern App</Text>
      <FlatList 
        data = {vociList}
        keyExtractor={(item) => item.term}
        renderItem={({item}) => <VociItem voci={item} />}
        />
        <Pressable style={styles.fab} onPress ={() => router.push("/learn")}>
          <Ionicons name="play" size={24} color="white" />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  fab:{
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    backgroundColor: "#0a1d7d",
    flex: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 30,
    alignItems: "center",

  },
});
