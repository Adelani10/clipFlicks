import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({ title, value, handleChangeText, placeholder }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <KeyboardAvoidingView
      className="w-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        className={`w-full gap-y-2 ${
          title === "AI Prompt" ? "mt-1" : "mt-6"
        } relative`}
      >
        <Text className="text-gray-100  text-lg capitalize">{title}</Text>
        <View className="w-full h-14 flex">
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
            }   w-full h-full p-4 text-gray-100 bg-black-200 rounded-lg`}
            autoCapitalize="none"
          />

          {title === "password" && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute w-6 h-6 right-4 top-1/2"
              style={styles.customStyle}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                resizeMode="contain"
                className="w-full h-full"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  customStyle: {
    transform: [{ translateY: -12 }],
  },
});

export default FormField;
