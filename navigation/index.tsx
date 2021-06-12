import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerTitle: "",
          headerStyle: {
            borderBottomWidth: 1,
            height: 80,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => alert("Profile icon preseed!")}
            >
              <Ionicons
                size={25}
                style={{
                  color: "blue",
                  position: "absolute",
                  top: 0,
                  left: 10,
                }}
                name={"person-outline"}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Notification icon preseed!")}
            >
              <Ionicons
                size={25}
                style={{
                  color: "blue",
                  position: "absolute",
                  top: 0,
                  right: 10,
                }}
                name={"notifications-outline"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
