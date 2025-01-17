import {React, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Text, View, FlatList, RefreshControl } from 'react-native'


const Bookmark = () => {
  const {data: posts, refetch} = useAppwrite(getAllPosts);


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 py-7">
            <Text className="text-3xl font-pmedium text-white">Saved Videos</Text>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the frst one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
       <StatusBar backgroundColor="#161622"
              style="light"
            />
    </SafeAreaView>
  )
}

export default Bookmark
