import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeBusinessScreen } from "../screens/HomeBusinessScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapBusinessScreen } from "../screens/MapBusinessScreen";
import { BussinessHeader } from "../components/BusinessHeader";
import { Ionicons } from "@expo/vector-icons";
import { AddDeliveryScreen } from "../screens/Delivery/AddDeliveryScreen";
import { EditDeliveryScreen } from "../screens/Delivery/EditDeliveryScreen";

const Tab = createBottomTabNavigator();

function HomeBusiness() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#06b6d4",
        tabBarInactiveTintColor: "#737373",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeBusinessScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapBusinessScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export default function BusinessStack() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Business"
          options={{
            headerTitle: (props) => (
              <BussinessHeader title="Mi negocio" {...props} />
            ),
            headerStyle: {
              backgroundColor: "#06b6d4",
            },
          }}
          component={HomeBusiness}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="AddDelivery"
          component={AddDeliveryScreen}
          options={{ title: "Adicionar reparto" }}
        />
        <Stack.Screen
          name="EditDelivery"
          component={EditDeliveryScreen}
          options={{ title: "Vista de reparto" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
