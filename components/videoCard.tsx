import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const VideoCard = ({ item }: any) => {
  const [play, setPlay] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const bookmarkVideo = async () => {
    try {
      const bookmarkedVideo = await axios.put(
        `https://videosappapi-1.onrender.com/api/v1/bookmark/${item.cfId}`
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const removeBookmark = async () => {
    try {
      const bookmarkedVideo = await axios.put(
        `https://videosappapi-1.onrender.com/api/v1/remove_bookmark/${item.cfId}`
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

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
              {item.creator.username || "Bimbo"}
            </Text>
          </View>
        </View>

        {!bookmarked ? (
          <TouchableOpacity
            onPress={() => {
              removeBookmark();
              setBookmarked(false);
            }}
            className=" inline-block"
          >
            <Icon name="heart-o" size={30} color="#ff007f" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              bookmarkVideo();
              setBookmarked(true);
            }}
          >
            <Icon name="heart" size={30} color="#ff007f" />
          </TouchableOpacity>
        )}
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
      </View>
    </View>
  );
};

export default VideoCard;
