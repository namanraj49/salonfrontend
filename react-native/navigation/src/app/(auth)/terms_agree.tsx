import { View, Text,StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import ButtonComp from '~/components/atoms/ButtonComp'
import { router } from 'expo-router'

const TermsAgree = () => {

  const onAgree = () => {
    router.push("/(auth)/login");
  };
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.welcome_text}>Welcome to Whatsapp</Text>
      <Text style={styles.description_text}>
        Read our <Text style={styles.link_text}>Privacy Policy.</Text>Tap "agree to continue" to accept the <Text style={styles.link_text}>Terms of Service.</Text>
      </Text>
      <View style={{width:moderateScale(300)}}>
        <ButtonComp title="Agree and continue"  onPress={onAgree}/></View>
    </View>
    <View style={styles.footer}>
     <Text style={styles.from_text}>From</Text>
     <Text style={styles.facebook_text}>Facebook</Text>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container:{
flex:1,
alignItems:"center",
backgroundColor:"white",
justifyContent:"space-between",
paddingVertical:verticalScale(84),
},
header:{
 
},
footer:{
  alignItems:"center"
},

from_text:{
  fontSize:moderateScale(12),
  color:"#867373",
},

  facebook_text:{
   fontSize:moderateScale(15),
   color:"#000",
   textTransform:"uppercase",
   fontWeight:"600",
},

welcome_text:{
fontSize:moderateScale(30),
fontWeight:"bold",
color:"black",
marginBottom:verticalScale(10),
},

description_text:{
   textAlign:"center",
   fontSize:moderateScale(13),
   color:"black",
},
link_text:{
  color:"blue"
}

})

export default TermsAgree