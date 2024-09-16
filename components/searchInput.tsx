import { View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const SearchInput = ({ value, handleChangeText, placeholder }: any) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View className="w-full mt-6 relative">
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        // placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={` ${
          isFocused ? "border-sky-400  border" : ""
        }   w-full font-bold tracking-wider p-4 text-gray-100 bg-black-200 rounded-lg`}
      />

      <Image
        source={icons.search}
        resizeMode="contain"
        className="w-5 absolute top-3.5 right-4 h-5"
      />
    </View>
  );
};

export default SearchInput;
