import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/searchInput";
import Trending from "@/components/trending";
import EmptyState from "@/components/emptyState";
import axios from "axios";
import VideoCard from "@/components/videoCard";
import { router } from "expo-router";
import { useVideoContext } from "@/context";

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getToken, currentCreator} = useVideoContext()

  const fetchPosts = async () => {

    const token = await getToken(); // Retrieve the token

    if (!token) {
        Alert.alert('No token found, user is not authenticated');
        return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://videosappapi-1.onrender.com/api/v1/videos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const refetch = () => fetchPosts();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-6 h-full px-6">
        
          <FlatList
            data={posts}
            keyExtractor={(item) => item.cfId.timestamp}
            renderItem={({ item }) => {
              return <VideoCard item={item} />;
            }}
            ListEmptyComponent={() => {
              return (
                <EmptyState
                  title="No videos found"
                  subtitle="No videos found in Explore"
                  buttonText="Go to bookmarks"
                  handlePress={() => router.push("/bookmark")}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View className="flex gap-y-3">
                  <View className="flex flex-row items-center  justify-between">
                    <View className="flex">
                      <Text className="text-gray-100 text-xs">
                        Welcome Back,
                      </Text>
                      <Text className="text-white capitalize font-bold text-xl">
                        {currentCreator.username ? currentCreator.username : "Creator"}
                      </Text>
                    </View>

                    <Image
                      source={images.logoSmall}
                      resizeMode="contain"
                      className=""
                    />
                  </View>

                  <SearchInput />

                  <Trending arr={posts} />
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
      </View>
    </SafeAreaView>
  );
};

export default Home;
