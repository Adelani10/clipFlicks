import {
  View,
  Text,
  ScrollView,
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

const Home = () => {
  const [query, setQuery] = useState<String>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://videosappapi-1.onrender.com/api/v1/videos"
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

  console.log(posts);
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex pt-10 h-full px-6">
          <FlatList
            data={posts}
            keyExtractor={(item) => item.cfId}
            renderItem={({ item }) => {
              return (
                <VideoCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  video={item.video}
                  creator={item.creator}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <EmptyState
                  title="No videos found"
                  subtitle="No videos found in Explore"
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
                      <Text className="text-white font-bold text-xl">
                        LaniPlayDirty
                      </Text>
                    </View>

                    <Image
                      source={images.logoSmall}
                      resizeMode="contain"
                      className=""
                    />
                  </View>

                  <SearchInput
                    value={query}
                    handleChangeText={(event: any) => setQuery(event?.target)}
                    placeholder="Search for a video"
                  />

                  <Trending posts={posts} />
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
