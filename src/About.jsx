import React from 'react';
import { StyleSheet, View,Text, ActivityIndicator,Dimensions, ScrollView , Image} from 'react-native';
import {  BottomNavigation, Headline , Subheading} from 'react-native-paper'

function AboutRoute () {
    return(
      <View style = {{ flex: 1,
      backgroundColor: 'rgb(145,135,120)',
      alignItems: 'center',
      justifyContent: 'center',}}>
        {/* <Image source = {require('D:\SEM 4\React-React-Native\React Native\COVID-19 Tracker\assets\img.jpg')} /> */}
      <Headline style = {{color : 'white' , fontSize : 30}}>Stay Home Stay Safe</Headline>
      </View>
    )
  }

  export default AboutRoute