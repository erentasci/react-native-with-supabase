import { supabase } from "@/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#151515",
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#151515",
        },
        tabBarActiveTintColor: "#fff",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              supabase.auth.signOut();
            }}
          >
            <Ionicons
              name="log-out-outline"
              color="#fff"
              size={28}
              style={{
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
