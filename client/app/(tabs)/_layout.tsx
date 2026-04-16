import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Platform, View } from "react-native";
import { Home } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#999",
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 20,
          left: 20,
          right: 20,
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#ffffff",
          borderRadius: 30,
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 5,
          borderTopWidth: 0,
          paddingBottom: 0, // prevents safe area from breaking layout
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 0,
              }}
            >
              <Home color={color} size={28} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
