import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { useVideoContext } from "@/context";
import { usePathname } from "expo-router";

const VideoCard = ({ item }: any) => {
  const [play, setPlay] = useState<boolean>(false);
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const [bookmarking, setIsBookmarking] = useState<boolean>(false);
  const { getToken } = useVideoContext();
  const pathname = usePathname();

  return (
    <View className="gap-y-2 mt-5">
      <View className="flex flex-row items-center justify-between">
        <View className="w-full max-w-[85%] flex flex-row items-center gap-x-2">
          <View className="flex justify-center items-center bg-pink-600 border-2 rounded-md w-9 border-sky-600 h-9">
            <Text className=" uppercase font-bold text-lg text-white">
              {item.title.slice(0, 1)}
            </Text>
          </View>

          <View className="w-full">
            <Text className="text-white font-bold text-sm">
              {item.title}...
            </Text>

            <Text
              numberOfLines={1}
              className="text-gray-100 font-semibold text-xs"
            >
              {/* {creator.username} */}
              Bimbo
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setMenuToggled(!menuToggled);
          }}
          className="h-6"
        >
          <Image source={icons.menu} resizeMode="contain" className="h-full" />
        </TouchableOpacity>
      </View>

      <View className="w-full rounded-xl h-52">
        {play ? (
          <Video
            source={require("../assets/mainVids/HanksDeath_BreakingBad.mp4")}
            className="rounded-lg w-full h-full"
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            useNativeControls
            onPlaybackStatusUpdate={(status: any) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
            onError={(error) => console.log(error)}
          />
        ) : (
          <View className="w-full flex justify-center items-center h-full">
            <Image
              source={{ uri: item.thumbnail }}
              resizeMode="cover"
              className="w-full rounded-xl h-full"
            />

            <TouchableOpacity
              onPress={() => setPlay(true)}
              className="absolute w-12 h-12"
            >
              <Image
                className="w-full  h-full"
                source={icons.play}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        {menuToggled && (
          <View className="flex absolute top-0 right-0 bg-black-200 p-1 rounded-md">
            <TouchableOpacity
              onPress={async () => {
                setIsBookmarking(true);
                const token = await getToken();
                if (!token) {
                  Alert.alert(
                    "Error",
                    "No token found, user is not authenticated"
                  );
                  return;
                }
                try {
                  if (pathname.startsWith("/bookmark")) {
                    await axios.put(
                      "https://videosappapi-1.onrender.com/api/v1/remove_bookmark",
                      item,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    Alert.alert("Success", "Bookmark Removed");
                  } else {
                    await axios.put(
                      "https://videosappapi-1.onrender.com/api/v1/bookmark",
                      item,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    Alert.alert("Success", "Video Bookmarked");
                  }
                  setIsBookmarking(false);
                } catch (error) {
                  Alert.alert("Error fetching bookmarks");
                  setIsBookmarking(false);
                  return;
                }
              }}
              className="border-b p-1 border-gray-100"
            >
              <Text className="capitalize text-sm text-gray-100">
                {pathname.startsWith("/bookmark")
                  ? "remove bookmark"
                  : "bookmark"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity disabled className="p-1">
              <Text className="capitalize text-sm text-gray-100">delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
