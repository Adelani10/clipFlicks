import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/formField";
import { images } from "@/constants";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";

interface formDataTypes {
  username: string,
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<formDataTypes>({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
                  username: event?.target,
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
                  email: event?.target,
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
                  password: event?.target,
                };
              });
            }}
            placeholder="Enter a secure password"
          />

          <View className="w-full flex items-center gap-y-2">
            <CustomButton
              title="Sign Up"
              handlePress={() => {}}
              isLoading={isSubmitting}
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
