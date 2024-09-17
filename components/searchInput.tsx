import { View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}: any) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<any>(initialQuery || "");
  const pathname = usePathname();

  console.log(query)
  return (
    <View className="w-full mt-6 relative">
      <TextInput
        value={query}
        placeholder={"Search for video"}
        placeholderTextColor="#fff"
        onChangeText={(event: any) => setQuery(event.target)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={` ${
          isFocused ? "border-sky-400  border" : ""
        }   w-full font-bold tracking-wider p-4 text-gray-100 bg-black-200 rounded-lg`}
      />

      <TouchableOpacity
        onPress={() => {
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
        }}
        className="w-5 absolute top-3.5 right-4 h-5"
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

export default SearchInput;
