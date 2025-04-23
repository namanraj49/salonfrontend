import { View, Text,StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import {scale,verticalScale,moderateScale} from "react-native-size-matters"


const Auth = () => {
const [isLoading,setIsLoading] = useState(true);
 
let navigate_to_welcome = () =>{
  router.push("/(auth)/terms_agree")
};

let loading_timeout = () =>{
  setIsLoading(true);
  setTimeout(navigate_to_welcome,3000);
};

useEffect(()=>{
   const timeout = setTimeout(loading_timeout,2000);

   return () =>{
    clearTimeout(timeout)
   }
   
},[]);

  return (
    <SafeAreaView style={Styles.container}>
    <View style={Styles.header}></View>
    <View style={Styles.body}>
      <Text style={Styles.whatsapp_text}>Whatsapp</Text>
    </View>
    <View style={Styles.footer}>
       {
        isLoading ? (
          <>
          <ActivityIndicator size={moderateScale(50)} color={"#0CCC83"}/>
          <Text style={Styles.loading_text}>Loading</Text>
          </>
        ) : ( <>
        <Text style={Styles.from_text}>From</Text>
        <Text style={Styles.facebook_text}>Facebook</Text>
        </>
       )}
     
    </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  container:{
      flex:1,
     
      alignItems:"center",
      justifyContent:"space-between",
      paddingVertical:verticalScale(70),

  },
  header:{
    
  },
  body:{
   alignItems:"center",
   gap:verticalScale(19),

    },
  footer: {
    height:verticalScale(80),
    alignItems:"center",
    justifyContent:"flex-end",
    },
    from_text:{
      fontSize:moderateScale(12),
      color:"#867373"
    },
    facebook_text:{
      fontSize:moderateScale(15),
      color:"#000000"
    },
    whatsapp_text:{
fontSize:moderateScale(35),
color:"#000000",
fontWeight:"bold"
    },

    loading_text:{
   fontSize:moderateScale(24),
   color:"#00A884",
   fontWeight:"bold"
    }, 
})

export default Auth


