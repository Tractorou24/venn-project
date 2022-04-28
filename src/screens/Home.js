import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ColorContext from "../utils/ColorContext";
import Projects from ".//Projects";
import Members from "./Members";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [color] = useContext(ColorContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color,
      }}
    >
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="briefcase-account" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="briefcase-account" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
