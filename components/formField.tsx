import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({ title, value, handleChangeText, placeholder }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View className={`w-full gap-y-2 ${title === "AI Prompt" ? "mt-1" : "mt-6"} relative`}>
      <Text className="text-gray-100 text-lg capitalize">{title}</Text>
      <View className="w-full flex">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={` ${
            isFocused ? "border-sky-400  border" : ""
          }   w-full h-14 p-4 text-gray-100 bg-black-200 rounded-lg`}
          autoCapitalize="none"
        />

        {title === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
