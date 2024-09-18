import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import CustomButton from "./customButton";

interface emptyStateInterface {
    title: string;
    subtitle: string;
    handlePress: any
    buttonText: string
}

const EmptyState = ({title, subtitle, handlePress, buttonText}: emptyStateInterface) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  return (
    <View className="flex items-center justify-center mt-12 space-y-2">
      <Image source={images.empty} resizeMode="contain" className="w-48 border-white h-48" />
      <Text className="text-gray-100 text-sm">{subtitle}</Text>
      <Text className="text-white text-lg">{title}</Text>
      <CustomButton title={buttonText} handlePress={handlePress} isLoading={isRefreshing} />
    </View>
  );
};

export default EmptyState;
