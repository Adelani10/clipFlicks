import React from "react";
import { Stack } from "expo-router";
import VideoProvider from "@/context";

const RootLayout = () => {
  return (
    <VideoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </VideoProvider>
  );
};

export default RootLayout;
