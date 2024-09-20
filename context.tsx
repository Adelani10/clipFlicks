import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface VideoContextInterface {
  queryResults: any[];
  videoSearch: any;
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

  const videoSearch = async (query: string) => {
    const results = await axios.get(
      `https://videosappapi-1.onrender.com/api/v1/videos/search/${query}`
    );
    setQueryResults(results.data);
  };

  return (
    <VideoContext.Provider
      value={{
        queryResults,
        videoSearch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
