import useAppwrite from '../../lib/useAppwrite'
import {React, useEffect, useState} from 'react'
import { searchPosts } from '../../lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';





const Search = () => {
  const { query } = useLocalSearchParams();
  const {data: posts, refetch} = useAppwrite( () => searchPosts(query));
  const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      refetch()
    }, [query])
  return  (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
                <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
                <Text className="text-2xl font-psemibold text-white">{query}</Text>
                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} />
                </View>
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

export default Search

const styles = StyleSheet.create({})