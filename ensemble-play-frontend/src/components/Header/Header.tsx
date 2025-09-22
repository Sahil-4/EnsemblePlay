import { Text, View, StyleSheet } from "react-native";
import { appName } from "../../constants/app";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#6200ee",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Header;
