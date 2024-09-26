import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { Alert } from "react-native";

interface VideoContextInterface {
  queryResults: any[];
  videoSearch: any;
  getToken: any;
  currentCreator: any
}

const VideoContext = createContext<VideoContextInterface | null>(null);

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

const VideoProvider = ({ children }: any) => {
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [currentCreator, setCurrentCreator] = useState<any>(null)
  const pathname = usePathname();

  const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (token !== null) {
            return token;
        }
    } catch (error: any) {
        Alert.alert('Error retrieving the token:', error);
    }
    return null;
};

  const videoSearch = async (query: string) => {
    const token = await getToken(); // Retrieve the token

    if (!token) {
        Alert.alert('No token found, user is not authenticated');
        return;
    }
    const results = await axios.get(
      `https://videosappapi-1.onrender.com/api/v1/videos/search/${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setQueryResults(results.data);
  };

  const fetchCurrentUser = async () => {
    const token = await getToken();

    if (!token) {
        Alert.alert("Error", 'No token found, user is not authenticated');
        return;
    }
    const results = await axios.get(
      `https://videosappapi-1.onrender.com/api/v1/Creator`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCurrentCreator(results.data)
  }

  useEffect(()=>{
    fetchCurrentUser()
  }, [pathname])

  return (
    <VideoContext.Provider
      value={{
        queryResults,
        videoSearch,
        getToken,
        currentCreator
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
