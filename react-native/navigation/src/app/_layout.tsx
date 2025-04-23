import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Stack,Link } from 'expo-router'
import * as SplashScreen from "expo-splash-screen"


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    
  const [isLogin,setIsLogin] = useState(false);

   useEffect(() =>{ 
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 2000);
   
   },[])

  return (
    <>
    <Stack screenOptions={{headerShown:false}}/>
    {
      isLogin ?( <Redirect href={"/(main)"}/> ): (<Redirect href={"/(auth)"}/>)
    }
    </>
  )
}

export default RootLayout