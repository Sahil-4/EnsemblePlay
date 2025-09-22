import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types.ts";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeScreenProps) => {
  const navigateToRoom = () => {
    const roomId = "rm123456";
    const displayName = "Abc";
    const actionType = "join";
    return navigation.navigate("Room", { roomId, displayName, actionType });
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Go to Room Screen" onPress={navigateToRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
});

export default Home;
