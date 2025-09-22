export type RootStackParamList = {
  Home: undefined;
  Room: {
    roomId: string;
    displayName: string;
    actionType: "create" | "join";
  };
};
