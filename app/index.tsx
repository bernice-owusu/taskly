import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import * as Haptics from "expo-haptics";
const storageKey = "shoppingList";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAt?: number;
  lastUpdatedAt: number;
};

export default function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems(data);
      }
    };
    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newList = [
        { id: Date.now().toString(), name: value, lastUpdatedAt: Date.now() },
        ...items,
      ];
      saveToStorage(storageKey, newList);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems(newList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    const newList = items.filter((item) => item.id !== id);
    saveToStorage(storageKey, newList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(newList);
  };

  const handleToggleComplete = (id: string) => {
    const newList = items.map((item) => {
      if (item.id === id) {
        if (item.completedAt) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          completedAt: item.completedAt ? undefined : Date.now(),
          lastUpdatedAt: Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, newList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(newList);
  };

  return (
    <FlatList
      data={orderShoppingList(items)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <TextInput
          placeholder="Enter an item"
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

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAt && item2.completedAt) {
      return item2.completedAt - item1.completedAt;
    }

    if (item1.completedAt && !item2.completedAt) {
      return 1;
    }

    if (!item1.completedAt && item2.completedAt) {
      return -1;
    }

    if (!item1.completedAt && !item2.completedAt) {
      return item2.lastUpdatedAt - item1.lastUpdatedAt;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
