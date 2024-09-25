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

interface postsInterface {
  id: number;
  title: string;
  thumbnail: string;
  video: string;
}

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
      className="rounded-xl"
    >
      {play === false ? (
        <TouchableOpacity
          className="w-40 h-64 rounded-2xl bg-gray-100 flex justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={item.thumbnail}
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
          source={item.video}
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

const Trending = ({ arr }: any) => {
  const [posts, setPosts] = useState<postsInterface[]>([
    {
      id: 1,
      title: "Friends",
      thumbnail: require("../assets/trendingVids/friendsThumbnail.jpeg"),
      video: require("../assets/trendingVids/ChanandlerBong_Friends.mp4"),
    },
    {
      id: 2,
      title: "Fresh Prince of BelAir",
      thumbnail: require("../assets/trendingVids/fpthumbnail.png"),
      video: require("../assets/trendingVids/WillsRizz_FreshPrince.mp4"),
    },
    {
      id: 3,
      title: "Himym",
      thumbnail: require("../assets/trendingVids/himym.jpeg"),
      video: require("../assets/trendingVids/ReasonsToHaveSex_HIMYT.mp4"),
    },
    {
      id: 4,
      title: "Everybody hates Chris",
      thumbnail: require("../assets/trendingVids/ehcthumbnail.jpeg"),
      video: require("../assets/trendingVids/ChrisFlirting _EverybodyHatesChris.mp4"),
    },
    {
      id: 5,
      title: "Fresh Prince of BelAir",
      thumbnail: require("../assets/trendingVids/tothumbnail.png"),
      video: require("../assets/trendingVids/tothumbnail.png"),
    },
  ]);
  const [activeItem, setActiveItem] = useState<any>(posts[0]);

  return (
    <>
      {arr.length > 0 && (
        <View className="space-y-3">
          <Text className="text-gray-100 text-lg mt-6 tracking-wider">
            Trending Videos
          </Text>

          <FlatList
            data={posts}
            keyExtractor={(item: any) => item.id}
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
      )}
    </>
  );
};

export default Trending;
