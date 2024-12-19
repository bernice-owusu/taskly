import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAt?: number;
};

export default function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ShoppingListItemType[]>([]);

  const handleSubmit = () => {
    if (value.trim().length === 0) return;
    setItems([{ id: Date.now().toString(), name: value }, ...items]);
    setValue("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completedAt: item.completedAt ? undefined : Date.now(),
            }
          : item
      )
    );
  };

  return (
    <FlatList
      data={items}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <TextInput
          placeholder="Eg. Coffee"
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAt)}
        />
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
