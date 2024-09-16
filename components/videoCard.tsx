import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";

interface videoCardInterface {
  title: string;
  thumbnail: string;
  video: string;
  creator: any;
}

const VideoCard = ({
  title,
  thumbnail,
  video,
  creator,
}: videoCardInterface) => {
  const [play, setPlay] = useState<boolean>(false);

  console.log(play);

  return (
    <View className="gap-y-2 mt-5">
      <View className="flex flex-row items-center justify-between">
        <View className="w-full flex flex-row items-center gap-x-2">
          <View className="flex justify-center items-center bg-pink-600 border-2 rounded-md w-9 border-sky-600 h-9">
            {/* <Text className=" uppercase font-bold text-lg text-white">b</Text> */}
            <Text className=" uppercase font-bold text-lg text-white">{title.slice(0, 1)}</Text>

          </View>

          <View className="w-full max-w-[85%]">
            <Text className="text-white font-bold text-sm">{title}...</Text>

            <Text
              numberOfLines={1}
              className="text-gray-100 font-semibold text-xs"
            >
              Bimbo
            </Text>
          </View>
        </View>

        <Image source={icons.menu} resizeMode="contain" className="h-5" />
      </View>

      <View className="w-full  rounded-xl h-48">
        {play ? (
          <Video
            source={require("../assets/mainVids/HanksDeath_BreakingBad.mp4")}
            className="rounded-lg w-full border border-white h-full"
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
              source={{ uri: thumbnail }}
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
