import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: any) => {
  return (
    <View className="space-y-3">
      <Text className="text-gray-100 text-lg mt-6 tracking-wider">
        Trending Videos
      </Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.cfId}
        renderItem={({ item }) => {
          return (
            <View className="border h-56 w-32 mr-3 border-white rounded-xl">
              <Text className="text-white">{item.prompt}</Text>
            </View>
          );
        }}
        horizontal
      />
    </View>
  );
};

export default Trending;
