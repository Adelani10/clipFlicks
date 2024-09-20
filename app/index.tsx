import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "@/components/customButton";
import { router, Redirect } from "expo-router";
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex gap-y-3 justify-center items-center h-full px-10">
          <View className="flex flex-row items-center gap-x-2">
            <Image
              source={images.logoSmall}
              className=""
              resizeMode="contain"
            />

            <View className="flex flex-row">
              <Text className="text-white font-bold text-4xl">Clip</Text>
              <Text className="text-pink-600 font-semibold text-4xl">
                Flicks
              </Text>
            </View>
          </View>

          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-96 max-h-80 "
          />

          <View className="relative">
            <Text className="text-2xl flex relative tracking-wide font-semibold text-white text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-pink-600 tracking-widest text-2xl">
                ClipFlicks
              </Text>
            </Text>


            <Image
              source={images.path}
              className="absolute right-0 bottom-0 border-white"
              resizeMode="contain"
            />
          </View>

          <Text className=" text-[#cdcde0] text-center ">
            Where Nolstagia meets Innovation: Embark on a journey of limitless Exploration with ClipFlicks.
          </Text>

          <CustomButton title="Continue with Email" handlePress={() => router.push('/signIn')} isLoading={false} />
        </View>
      </ScrollView>

      <StatusBar style="auto"  />

    </SafeAreaView>
  );
};

export default index;
