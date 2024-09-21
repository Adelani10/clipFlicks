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
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      animation={activeItem === item.cfId.timestamp ? zoomIn : zoomOut}
      duration={500}
      className="rounded-xl"
    >
      {play === false ? (
        <TouchableOpacity
          className="w-40 h-64 rounded-2xl bg-gray-100 flex justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="h-full w-full overflow-hidden rounded-xl"
            resizeMode="cover"
          />

          <Image
            className="w-8 absolute h-8"
            source={icons.play}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <Video
          source={require("../assets/mainVids/GusDeath_BreakingBad.mp4")}
          className="rounded-xl w-40 h-64"
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
      {posts.length > 0 && (
        <Text className="text-gray-100 text-lg mt-6 tracking-wider">
          Trending Videos
        </Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.cfId.timestamp}
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
