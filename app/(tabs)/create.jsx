import {React, useState} from 'react'
import { router } from 'expo-router';
import { icons } from '../../constants';
import * as ImagePicker from "expo-image-picker"
import { createVideo } from '../../lib/appwrite';
import FormField from "../../components/FormField"
import { useVideoPlayer,VideoView } from 'expo-video';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title:"",
    video:null,
    thumbnail:null,
    prompt:""
  })
  const player = useVideoPlayer(form.video, player => {
          player.loop = false;
          player.play(); 
        })
  
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ["images"] : ["videos"],
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
      if(selectType === "image") {
        setForm({ ...form, thumbnail:result.assets[0]})
      }
      if(selectType === "video") {
        setForm({ ...form, video:result.assets[0]})
      }
    } 
    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2))
    //   }, 100)
    // }
  }

  const submit = async () => {
    if(!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the fields")
    }

    setUploading(true)

    try {

      await createVideo({
        ...form, userId: user.$id
      })

      Alert.alert("Success","Post uploaded successfully")
      router.push("/home")
    } catch (error) {
      Alert.alert("Error,", error.message)
    } finally {
      setForm({
        title:"",
        video:null,
        thumbnail:null,
        prompt:""
      })
      setUploading(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
          <Text className="text-2xl text-white font-psemibold">
            Upload Video
          </Text>
          <FormField
            title="Video title"
            value={form.title}
            placeholder="Give your video a catch title..."
            handleChangeText={(e) => setForm({ ...form, title:e})}
            otherStyles="mt-10"
          />
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>
            <TouchableOpacity onPress={() => openPicker("video")}>
              {
                form.video ? (
                  <VideoView
                      style={styles.video}
                      player={player}
                      contentFit="cover"
                      nativeControls
                />
                ) :(
                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                    <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        className="w-1/2 h-1/2"
                      />
                    </View>
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
             Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {
                form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri}}
                    resizeMode="cover"
                    className="w-full h-64 rounded-2xl"
                  />
                ) :(
                  <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        className="w-5 h-5"
                      />
                      <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The prompt you used to create this video"
            handleChangeText={(e) => setForm({ ...form, prompt:e})}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Submit & Publish"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 240,
    borderRadius:35,
    backgroundColor:"#00000066"
  },
})