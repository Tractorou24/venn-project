import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ColorContext from "../utils/ColorContext";
import Projects from ".//Projects";
import Members from "./Members";
import Contacts from "./Contacts";

const Tab = createBottomTabNavigator();

export default function Home() {
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
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account-box-multiple" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
