import {SplashScreen, Stack, useRouter, useSegments} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import { Text } from 'react-native';
import useAuthStore from "./lib/zustand";


export default function RootLayout() {

    const router = useRouter();
    const segments = useSegments();
    
    const {user,token,checkAuth,loading}:AuthStoreProps = useAuthStore();

    useEffect(()=>{
      checkAuth();
    },[]);

    useEffect(()=>{
      const inAuthScreen = segments[0] === "(auth)";
      const isSignedIn = token && user;

      if(!isSignedIn && !inAuthScreen){
        router.replace("/(auth)");
      }
      else if(isSignedIn && inAuthScreen){
        router.replace("/(tabs)");
      }
    },[token,segments,user]);



    SplashScreen.preventAutoHideAsync();

    const [fontLoaded] = useFonts({
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    })

    useEffect(()=>{
        if(fontLoaded) {
            SplashScreen.hideAsync();
        }
    },[fontLoaded])


    return <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(auth)"
      />
      <Stack.Screen
        name="(tabs)"
      />
  </Stack>;
}
