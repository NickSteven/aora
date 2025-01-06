import {React, useState} from 'react'
import {images} from "../../constants"
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setform] = useState({
    email:"",
    password:""
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = async () => {
      if(!form.email || !form.password) {
        Alert.alert("Error", "Please fill in all the fields")
      }
      setisSubmitting(true)
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true)
        router.replace("/home");
      } catch (error) {
        Alert.alert("error", error.message)
      } finally {
        setisSubmitting(false)
      }
    }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({...form, email:e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({...form, password :e})}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}  
          />
        </View>
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
          <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})