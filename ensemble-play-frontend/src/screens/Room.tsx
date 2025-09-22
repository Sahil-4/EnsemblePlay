import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types.ts";

type RoomScreenProps = NativeStackScreenProps<RootStackParamList, "Room">;

const Room = ({ route }: RoomScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>RoomScreen</Text>
      <Text>roomId: {route.params.roomId}</Text>
      <Text>displayName: {route.params.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
});

export default Room;
