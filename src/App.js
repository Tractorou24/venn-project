import { registerRootComponent } from "expo";

import { useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import NewProject from "./screens/NewProject";

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createNativeStackNavigator();

export default function App() {
  const [color, setColor] = useState(null);

  return (
    <ColorContext.Provider value={[color, setColor]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewProject" component={NewProject} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorContext.Provider>
  );
}

registerRootComponent(App);
