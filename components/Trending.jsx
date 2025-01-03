import { icons } from '../constants';
import React, { useState } from 'react'
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

const zoomIn = {
  0:{
    scale: 0.9
  },
  1:{
    scale: 1
  }
}

const zoomOut = {
  0:{
    scale: 1
  },
  1:{
    scale: 0.9
  }
}

// since the original video is not being supported by the VideoViw by expo-video, I changed video link for each video record

const TrendingItem = ({activeItem, item}) => {
  // expo-av is deprecated and the new one is expo-vide
  const player = useVideoPlayer(item.video, player => {
    player.loop = false;
    // player.play(); // play the video automatically when component mount
  })
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={300}
    >
      {
        isPlaying ?  (
          <VideoView
            style={styles.video}
            player={player}
            contentFit="contain"
          />
        ) : (
          <TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
            >
              <ImageBackground
                source={{
                  uri: item.thumbnail
                }}
                className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
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
      
    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1])
  const viewableItemsChanged = ({ viewableItems }) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold:70
        }}
        contentOffset={{ x: 170}}
        horizontal
    />
  )
}

export default Trending

const styles = StyleSheet.create({
  video: {
    width: 182,
    height: 288,
    borderRadius:35,
    backgroundColor:"#00000066"
  },
})