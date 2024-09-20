import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/formField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [videoObj, setVideoObj] = useState<any>({
    cfId: null,
    title: "",
    prompt: "",
    thumbnail: "",
    video: "",
    creator: {
      email: "",
      username: "",
      password: "",
      bookmarks: [],
    },
  });

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="flex pt-8 h-full px-6">
        <View className="flex gap-y-2 ">
          <Text className="text-white text-2xl font-bold">Upload Video</Text>
          <FormField
            title="Video Title"
            value={videoObj.title}
            handleChangeText={(event: any) => {
              setVideoObj({ ...videoObj, title: event });
            }}
            placeholder="Give your video a catchy title"
          />

          <View className="space-y-2">
            <Text className="text-gray-100 text-lg capitalize">
              Upload Video
            </Text>
            <View className="w-full h-40 bg-black-200 flex items-center justify-center rounded-xl">
              {videoObj.video ? (
                <Video
                  source={videoObj.video}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  className="w-full h-full"
                />
              ) : (
                <TouchableOpacity className="p-4 border border-dashed border-pink-600">
                  <Image source={icons.upload} className="" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="space-y-2">
            <Text className="text-gray-100 text-lg capitalize">
              Thumbnail Image
            </Text>

            <View className="w-full bg-black-200 h-16 flex items-center justify-center rounded-xl">
              {videoObj.thumbnail ? (
                <Image
                  source={videoObj.video}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              ) : (
                <TouchableOpacity className="">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className=""
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FormField
            title="AI Prompt"
            value={videoObj.prompt}
            handleChangeText={(event: any) => {
              setVideoObj({ ...videoObj, prompt: event });
            }}
            placeholder="Your video should have an accessible prompt"
          />

          <CustomButton
            title="Upload"
            handlePress={() => {
              console.log("Uploading");
            }}
            isLoading={uploading}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Create;
