import { View, Text, FlatList,} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "@/components/videoCard";
import EmptyState from "@/components/emptyState";
import SearchInput from "@/components/searchInput";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchForVideos = async () => {
    const results = await axios.get(
      `https://videosappapi-1.onrender.com/api/v1/videos/search/${query}`
    );
    setSearchResults(results.data);
  };

  useEffect(() => {
    searchForVideos()
  }, [query])

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-10 h-full px-6">
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.cfId}
          renderItem={({ item }) => {
            return <VideoCard item={item} />;
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="No videos found"
                subtitle="No videos found in Explore"
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View className="flex gap-y-3">
                <View className="flex flex-row items-center  justify-between">
                  <View className="flex">
                    <Text className="text-gray-100 text-xs">
                      Search results,
                    </Text>
                    <Text className="text-white font-bold text-xl">
                      {query}
                    </Text>
                  </View>
                </View>

                <SearchInput initialQuery={query} />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
