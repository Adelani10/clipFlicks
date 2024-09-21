import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface buttonProps {
  title: string;
  handlePress: any;
  isLoading: boolean;
  otherStyles: string;
}

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  otherStyles,
}: buttonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      className={`${
        isLoading ? "bg-pink-900" : "bg-pink-600"
      } ${otherStyles} rounded-lg p-3 w-full`}
    >
      <Text className="text-lg text-center text-white tracking-wide font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
