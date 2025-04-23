import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import { View,Text,StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import {setupPlayer,addTrack} from "../musicPlayerService"
import { SafeAreaView } from 'react-native-safe-area-context';
import MusicPlayer from './screens/MusicPlayer';
export default function App() {
   const [isPlayerReady,setIsPlayerReady] = useState(false);

   async function setup(){
    let isSetup = await setupPlayer()

    if(isSetup){
        await addTrack()
    }

    setIsPlayerReady(isSetup)
   }

   useEffect(() => {
    setup()
}, [])

if(!isPlayerReady){
    return (
        <SafeAreaView>
            <ActivityIndicator/>
        </SafeAreaView>
    )
}
   

  return (
    <View>
        <Text>
        <StatusBar barStyle={"light-content"} />
      
           <MusicPlayer/>
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})