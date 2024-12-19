import { Tabs } from "expo-router";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primaryColor,
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shoppinglist",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
