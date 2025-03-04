import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry } from "react-native";
import Layout from "./_layout";
import { name as appName } from "../app.json";

const App = () => (
  <NavigationContainer>
    <Layout />
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
