import React from "react";
import { Stack } from "expo-router";
// import VideoProvider from "@/context";

const RootLayout = () => {
  return (
    // <VideoProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "#f5f5f5" }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, statusBarColor: "#f5f5f5" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, statusBarColor: "#f5f5f5" }}
      />
      <Stack.Screen
        name="search/[query]"
        options={{ headerShown: false, statusBarColor: "#f5f5f5" }}
      />
    </Stack>
    // </VideoProvider>
  );
};

export default RootLayout;
