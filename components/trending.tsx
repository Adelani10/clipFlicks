import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const zoomIn: any = { 0: { scale: 0.9 }, 1: { scale: 1 } };
const zoomOut: any = { 0: { scale: 1 }, 1: { scale: 0.9 } };

const TrendingItem = ({ activeItem, item }: any) => {

  // console.log(item)
  console.log(activeItem)
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      animation={activeItem === item ? zoomIn : zoomOut}
      duration={500}
    >
      {play === false ? (
        <TouchableOpacity onPress={() => setPlay(true)}>
          <ImageBackground source={{uri: item.thumbnail}} className="" resizeMode="cover" />

          <Image
            className="w-full  h-full"
            source={icons.play}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <Video
          source={require("../assets/mainVids/GusDeath_BreakingBad.mp4")}
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
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState<any>(posts[0]);



  return (
    <View className="space-y-3">
      <Text className="text-gray-100 text-lg mt-6 tracking-wider">
        Trending Videos
      </Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.cfId}
        renderItem={({ item }) => {
          return <TrendingItem activeItem={activeItem} item={item} />;
        }}
        horizontal
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170, y: 0 }}
      />
    </View>
  );
};

export default Trending;
