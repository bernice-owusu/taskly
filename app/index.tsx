import { StyleSheet, TextInput, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialItems: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Orange juice" },
];

export default function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ShoppingListItemType[]>(initialItems);

  const handleSubmit = () => {
    if (value.trim().length === 0) return;
    setItems([{ id: Date.now().toString(), name: value }, ...items]);
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Eg. Coffee"
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {items.map(({ id, name }) => (
        <ShoppingListItem key={id} name={name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 12,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 18,
  },
});
