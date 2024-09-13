import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface buttonProps {
  title: string;
  handlePress: any;
  isLoading: boolean;
}

const CustomButton = ({ title, handlePress, isLoading }: buttonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      className={`${isLoading ? "bg-pink-900" : "bg-pink-600"} rounded-lg  mt-12 p-3 w-full`}
    >
        <Text className="text-lg text-center text-white tracking-wide font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
