import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { theme } from "../../theme";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    // let result = await registerForPushNotificationsAsync();
    Alert.alert("Successfull set scheduled notification");
    // console.log(result);
    // if (result === "granted") {
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "I'm a notification from your app! 📨",
    //     body: "This is a scheduled notification.",
    //   },
    //   trigger: {
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     seconds: 5,
    //     // repeats: true,
    //   },
    // });
    // Alert.alert("Successfull set scheduled notification");
    // } else {
    // Alert.alert(
    //   "Unable to schedule notification",
    //   "Enable the notifications permission for Expo Go in settings"
    // );
    // }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Schedule Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
