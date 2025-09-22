import { AppRegistry } from "react-native";
import App from "./src/App.tsx";
import { appKey } from "./app.json";

AppRegistry.registerComponent(appKey, () => App);
