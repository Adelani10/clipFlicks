// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// interface postsInterface {
//   id: any;
//   cfId: number;
//   title: string;
//   prompt: string;
//   thumbnail: string;
//   video: string;
//   creator: any;
// }

// interface VideoContextInterface {
//   posts: postsInterface[] | null;
//   setPosts: any | null;
// }

// const VideoContext: any = createContext<VideoContextInterface | null>(null);

// export const useVideoContext: any = () => useContext(VideoContext);

// const VideoProvider = ({ children }: any) => {
//   const [posts, setPosts] = useState<VideoContextInterface[] | null>();

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         "https://videosappapi-1.onrender.com/api/v1/videos"
//       );
//       //   setPosts(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [posts]);

//   return (
//     <VideoContext.Provider
//       value={{
//         posts,
//         setPosts,
//       }}
//     >
//       {children}
//     </VideoContext.Provider>
//   );
// };

// export default VideoProvider;

// // exp://127.0.0.1:8081
