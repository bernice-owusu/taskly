import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Delete Pressed"),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleDelete} >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomColor: "#1a759f",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8, 
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  button:{
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
