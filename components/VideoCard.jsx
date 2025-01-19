import { useEvent } from 'expo';
import { icons } from '../constants'
import{ React, useState} from 'react'
import { likeVideo } from '../lib/appwrite';
import { useVideoPlayer,VideoView } from 'expo-video';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'


const VideoCard = ({video:{$id, title,thumbnail, video, creator:{username, avatar}}, userId}) => {
    const [play, setPlay] = useState(false);
    const player = useVideoPlayer(video, player => {
        player.loop = false;
        // player.play(); // play the video automatically when component mount
      })
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const saveVideo = async (videoId, userId) => {
      try {
        await likeVideo(videoId, userId);
        Alert.alert("Success","Post saved successfully")
      } catch (error) {
        Alert.alert("Error,", error.message)
      }
    }
      
  return (
    <View className="flex-col items-center px-4 mb-14">
  

     
        <View className="flex-row gap-3 items-start">
          <TouchableOpacity className="w-full" onPress={() => saveVideo($id, userId)}>
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    {/**Put uri property when it's a remote an url image) */}
                    <Image source={{uri: avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"    
                    />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                    <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain"/>
            </View>
        </View>
        {
            isPlaying ? (
               <VideoView
                    style={styles.video}
                    player={player}
                    contentFit="contain"
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        if (isPlaying) {
                          player.pause();
                        } else {
                          player.play();
                        }
                      }}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
                    <Image
                        source={{uri: thumbnail}}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({
    video: {
      width: "100%",
      height: 240,
      borderRadius:35,
      backgroundColor:"#00000066"
    },
  })