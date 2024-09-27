import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "@/components/videoCard";
import EmptyState from "@/components/emptyState";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import { useVideoContext } from "@/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [creatorPosts, setCreatorPosts] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { currentCreator, getToken } = useVideoContext();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("authToken")
      router.replace("/signIn")
    } catch (error: any) {
      Alert.alert("Error signing out", error.message)
    }
  }

  // const fetchCurrentUserVideos = async () => {
  //   setIsFetching(true);
  //   const token = await getToken();
  //   if (!token) {
  //     Alert.alert("Error", "No token found, user is not authenticated");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://videosappapi-1.onrender.com/api/v1/videos/${currentCreator.accountId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setCreatorPosts(response.data);
  //   } catch (error: any) {
  //     setIsFetching(false);
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  // console.log(creatorPosts);

  // useEffect(() => {
  //   fetchCurrentUserVideos();
  // }, [currentCreator]);

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-6 h-full px-6">
        <FlatList
          data={creatorPosts}
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
              <View className="flex gap-y-3">
                <View className="flex space-y-3 items-center">
                  <TouchableOpacity onPress={logOut} className="self-end">
                    <Image
                      source={icons.logout}
                      resizeMode="contain"
                      className="h-7 w-7"
                    />
                  </TouchableOpacity>

                  <View className="flex space-y-1 items-center">
                    <View className="flex items-center">
                      <View className="h-16 w-16 border-4 flex items-center justify-center rounded-lg border-pink-300 bg-white">
                        <Text className="text-4xl uppercase font-bold text-pink-400">
                          {currentCreator.username.slice(0, 1)}
                        </Text>
                      </View>

                      <Text className="text-white font-semibold text-lg">
                        {currentCreator.username}
                      </Text>
                    </View>

                    <View className="flex flex-row space-x-7">
                      <View className="flex items-center">
                        <Text className="text-white font-bold">50</Text>
                        <Text className="text-gray-100 font-semibold">
                          Posts
                        </Text>
                      </View>

                      <View className="flex items-center">
                        <Text className="text-white font-bold">1.5K</Text>
                        <Text className="text-gray-100 font-semibold">
                          Views
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isFetching}
          //     onRefresh={fetchCurrentUserVideos}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
