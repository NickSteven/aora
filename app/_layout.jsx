import "../global.css"
import { useEffect } from 'react'
import { useFonts } from "expo-font"
import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
       "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if(error) throw error;

        if(fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if(!fontsLoaded && !error) return null;

  return (
    /*
      While changing to another screen using expo-router's Link, there is a little glitch or flickering (white screen for a half of second)
      and to avoid that, on the Stack, a barckoundColor property is placed in the Stack props and the value will be equal to the main color of the app
     */
    <Stack screenOptions={{
      contentStyle:{
        backgroundColor:"#161622"
      }
    }}>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        {/* <Stack.Screen name="/search/[query]" options={{headerShown: false}} /> */}
    </Stack>
  )
}

export default RootLayout