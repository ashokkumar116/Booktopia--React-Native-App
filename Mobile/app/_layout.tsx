import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import { Text } from 'react-native';


export default function RootLayout() {



    SplashScreen.preventAutoHideAsync();

    const [fontLoaded] = useFonts({
        "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
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
