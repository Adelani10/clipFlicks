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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface formDataTypes {
  username: string;
  email: string;
  password: string;
  bookmarks: any[];
}

const SignUp = () => {
  const [formData, setFormData] = useState<formDataTypes>({
    username: "",
    email: "",
    password: "",
    bookmarks: [],
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignUp = async () => {
    setIsSubmitting(true);
    if (formData.email && formData.password) {
      try {
        const response = await axios.post(
          "https://videosappapi-1.onrender.com/api/v1/register",
          formData
        );
        await AsyncStorage.setItem("authToken", response.data);
        router.replace("/home");
      } catch (error: any) {
        // Handle error (e.g., invalid credentials, token issues)
        if (error.response) {
          // The request was made, and the server responded with a status code outside of 2xx
          if (error.response.status === 401) {
            Alert.alert("Authentication Failed", "Invalid email or password.");
          } else {
            Alert.alert(
              "Login Error",
              error.response.data || "An error occurred."
            );
          }
        } else if (error.request) {
          // The request was made, but no response was received
          Alert.alert(
            "No Response",
            "Server did not respond. Please try again."
          );
        } else {
          // Something else happened while making the request
          Alert.alert("Error", "An unexpected error occurred.");
        }
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

  console.log(formData)

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
            <Text className="font-semibold text-white text-2xl">Sign Up</Text>
          </View>

          <FormField
            title="username"
            value={formData.username}
            handleChangeText={(event: any) => {
              setFormData((data) => {
                return {
                  ...data,
                  username: event,
                };
              });
            }}
            placeholder="Choose a username"
          />

          <FormField
            title="email"
            value={formData.email}
            handleChangeText={(event: any) => {
              setFormData((data) => {
                return {
                  ...data,
                  email: event,
                };
              });
            }}
            placeholder="delani10delani@gmail.com"
          />

          <FormField
            title="password"
            value={formData.password}
            handleChangeText={(event: any) => {
              setFormData((data) => {
                return {
                  ...data,
                  password: event,
                };
              });
            }}
            placeholder="Enter a secure password"
          />

          <View className="w-full flex items-center gap-y-2">
            <CustomButton
              title="Sign Up"
              handlePress={handleSignUp}
              isLoading={isSubmitting}
              otherStyles="mt-12"
            />
            <Text className="text-gray-100 text-lg font-semibold ">
              Already have an account?
              <Link className="text-pink-400 font-semibold" href={"/signIn"}>
                {" "}
                SignIn
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
