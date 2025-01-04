import useAppwrite from '../../lib/useAppwrite'
import {React, useEffect, useState} from 'react'
import { getUserPosts, searchPosts } from '../../lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View,FlatList, TouchableOpacity, Image } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { StatusBar } from 'expo-status-bar';





const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts, refetch} = useAppwrite( () => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  
  return  (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
      <StatusBar backgroundColor="#161622"
                    style="light"
                  />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})