import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useVideoContext } from "@/context";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string | undefined>("");
  const { videoSearch } = useVideoContext();
  const pathname = usePathname();

  return (
    <View className="w-full h-14 mt-6 relative">
      <TextInput
        value={query}
        placeholder={"Search for video"}
        placeholderTextColor="#cdcde0"
        onChangeText={(e: any) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={` ${
          isFocused ? "border-sky-400  border" : ""
        } w-full h-full font-bold tracking-wider p-4 text-gray-100 bg-black-200 rounded-lg`}
      />

      <TouchableOpacity
        onPress={async () => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
          try {
            await videoSearch(query);
          } catch (error) {
            Alert.alert("No videos", "Videos not found");
          }
        }}
        className="w-5 h-5 absolute top-1/2 right-4 "
        style={styles.customStyle}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-full h-full"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customStyle: {
    transform: [{ translateY: -10 }], 
  },
});

export default SearchInput;
