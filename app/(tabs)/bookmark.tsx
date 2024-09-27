import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import VideoCard from "@/components/videoCard";
import EmptyState from "@/components/emptyState";
import { Link, router } from "expo-router";
import { icons } from "@/constants";
import { useVideoContext } from "@/context";
import axios from "axios";

const Bookmark = () => {
  const { getToken, currentCreator } = useVideoContext();
  const [userBookmarks, setUserBookmarks] = useState<any[]>(currentCreator.bookmarks);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clearBookmark = async () => {};



  console.log(userBookmarks);

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-6 h-full px-6">
        <FlatList
          data={userBookmarks}
          keyExtractor={(item) => item.cfId.timestamp}
          renderItem={({ item }) => {
            return <VideoCard key={item.cfId.timestamp} item={item} />;
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="No videos found with that keyword"
                subtitle="No videos found"
                handlePress={() => {
                  router.push("/home");
                }}
                buttonText="Go back Home"
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View className="flex flex-row items-center justify-between">
                <Text className="text-white font-bold text-2xl ">
                  Bookmarks
                </Text>

                <TouchableOpacity onPress={clearBookmark} className="self-end">
                  <Text className="text-red-500 text-lg font-semibold">
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isLoading}
          //     onRefresh={getUserBookmarks}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
