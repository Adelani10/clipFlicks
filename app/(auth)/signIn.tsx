import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormField from "@/components/formField";
import { images } from "@/constants";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useVideoContext } from "@/context";

interface formDataTypes {
  email: string;
  password: string;
  username: string;
  bookmarks: any[];
}

const SignIn = () => {
  const [formData, setFormData] = useState<formDataTypes>({
    email: "",
    password: "",
    username: "",
    bookmarks: [],
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsSubmitting(true);
    if (formData.email && formData.password) {
      try {
        const response = await axios.post(
          "https://videosappapi-1.onrender.com/api/v1/login",
          formData
        );
        await AsyncStorage.setItem("authToken", response.data);
        router.replace("/home");
      } catch (error: any) {
        Alert.alert("Error signing in", error.message);
      } finally {
        setIsSubmitting(false);
        setFormData({
          email: "",
          password: "",
          username: "",
          bookmarks: [],
        });
      }
    } else {
      Alert.alert("Error", "Please fill the required fields");
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex pt-10 items-center h-full px-6">
          <View className="flex flex-row items-center mb-10 self-start  gap-x-2">
            <Image
              source={images.logoSmall}
              className="w-8 h-8"
              resizeMode="contain"
            />

            <View className="flex flex-row">
              <Text className="text-white font-bold text-3xl">Clip</Text>
              <Text className="text-pink-600 font-semibold text-3xl">
                Flicks
              </Text>
            </View>
          </View>

          <View className="self-start ">
            <Text className="font-semibold text-white text-2xl">Sign In</Text>
          </View>

          <FormField
            title="email"
            value={formData.email}
            handleChangeText={(e: any) => {
              setFormData({
                ...formData,
                email: e,
              });
            }}
            placeholder="delani10@gmail.com"
          />

          <FormField
            title="password"
            value={formData.password}
            handleChangeText={(e: any) => {
              setFormData({
                ...formData,
                password: e,
              });
            }}
            placeholder="Enter a secure password"
          />

          <View className="w-full flex items-center gap-y-2">
            <CustomButton
              title="Sign In"
              handlePress={handleSignIn}
              isLoading={isSubmitting}
              otherStyles="mt-12"
            />
            <Text className="text-gray-100 text-lg font-semibold ">
              Don't have an account?
              <Link className="text-pink-400 font-semibold" href={"/signUp"}>
                {" "}
                SignUp
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
