import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/formField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/customButton";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import axios from "axios";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [videoObj, setVideoObj] = useState<any>({
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

  const submit = async () => {
    if (
      !videoObj.prompt ||
      !videoObj.title ||
      !videoObj.video ||
      !videoObj.thumbnail
    ) {
      return Alert.alert("Parameter(s) missing", "Please fill all the fields");
    }

    setUploading(true);
    try {
      await axios
        .post("https://videosappapi-1.onrender.com/api/v1/videos", videoObj)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      Alert.alert("Success", "Post successfully uploaded");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Something went wrong", error.message);
    } finally {
      setVideoObj({
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

      setUploading(false);
    }
  };

  const mediaSelector = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;

        if (selectType === "image") {
          setVideoObj((prev: any) => ({
            ...prev,
            thumbnail: uri,
          }));
        }

        if (selectType === "video") {
          setVideoObj((prev: any) => ({
            ...prev,
            video: uri,
          }));
        }
      } else {
        console.error("No assets found in the result");
      }
    } else {
      console.log("User canceled image/video selection");
    }
  };

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
              Select Video
            </Text>
            <View className="w-full h-40 bg-black-200 flex items-center justify-center rounded-xl">
              {videoObj.video ? (
                <Video
                  source={{ uri: videoObj.video }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  className="w-full h-full"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => mediaSelector("video")}
                  className="p-4 border border-dashed border-pink-600"
                >
                  <Image source={icons.upload} className="" resizeMode="contain" />
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
                  source={{ uri: videoObj.thumbnail }}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => mediaSelector("image")}
                  className=""
                >
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
            handlePress={submit}
            isLoading={uploading}
            otherStyles="mt-4"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Create;