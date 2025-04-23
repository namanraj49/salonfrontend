import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { verticalScale,scale, moderateScale } from 'react-native-size-matters';

const ButtonComp = ({title,onPress}:any) => {
  return (
    <TouchableOpacity style={styles.button_container} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.button_text}>{title}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    button_container:{
       backgroundColor:"#00A884",
       width:"100%",
       paddingVertical:verticalScale(10),
       paddingHorizontal:scale(10),
       borderRadius:moderateScale(4),
       alignItems:"center"

    },
    button_text:{
        fontSize:moderateScale(14),
        color:"white",
        alignItems:"center"
    }
})

export default ButtonComp