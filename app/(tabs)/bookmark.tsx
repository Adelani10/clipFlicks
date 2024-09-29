import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import VideoCard from "@/components/videoCard";
import EmptyState from "@/components/emptyState";
import { router } from "expo-router";
import { useVideoContext } from "@/context";
import axios from "axios";

const Bookmark = () => {
  const { currentCreator, fetchCurrentUser, getToken } = useVideoContext();

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex pt-6 h-full px-6">
        <FlatList
          data={currentCreator.bookmarks}
          keyExtractor={(item) => item.cfId.timestamp}
          renderItem={({ item }) => {
            return <VideoCard key={item.cfId.timestamp} item={item} />;
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
              <View className="flex flex-row items-center justify-between">
                <Text className="text-white font-bold text-2xl ">
                  Bookmarks
                </Text>

                <TouchableOpacity
                  onPress={async () => {
                    const token = await getToken();
                    if (!token) {
                      Alert.alert("No token found, user is not authenticated");
                      return;
                    }
                    try {
                      await axios.put(
                        "https://videosappapi-1.onrender.com/api/v1/creator/clear_bookmarks",
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      Alert.alert("Success", "Bookmark cleared");
                      fetchCurrentUser();
                    } catch (error: any) {
                      Alert.alert("Error", error.message);
                    }
                  }}
                  className="self-end"
                >
                  <Text className="text-red-500 text-lg font-semibold">
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
