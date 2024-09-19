import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "@/components/videoCard";
import EmptyState from "@/components/emptyState";
import SearchInput from "@/components/searchInput";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoContext } from "@/context";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { queryResults } = useVideoContext();

  console.log(queryResults)

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-10 h-full px-6">
        <FlatList
          data={queryResults}
          keyExtractor={(item) => item.cfId}
          renderItem={({ item }) => {
            return <VideoCard key={item.cfId} item={item} />;
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="No videos found with that keyword"
                subtitle="No videos found"
                handlePress={() => {
                  router.push("/home");
                }}
                buttonText="Go back Home"
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

                <SearchInput />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
