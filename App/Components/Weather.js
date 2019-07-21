import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';


  state= {
    Detail: null,
    Temp: null,
    ImageNow: null
  };


  const Weather = ({ weatherNow, array_1, array_2, array_3, array_4, array_5, array_6, }) => {

  
    this.state.Detail = weatherNow;
    this.state.ImageNow = weatherNow.weather[0].icon;
    this.state.Temp = weatherNow.main.temp
    let array = [];
    let countMin = [];
    let countMax = [];
    let Temp_min = null;
    let Temp_max = null;

    array.push(array_1, array_2, array_3, array_4, array_5, array_6);

    let Seconds = (weatherNow.dt * 1000)
    let CurrentDate = new Date(Seconds).toDateString()

    let itemList = array.map((Data, index) => {
 
      let hours = new Date(Data.dt_txt).getHours()
      let AM_PM = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      //// min and max temp
      countMin.push(Data.main.temp_min)
      Temp_min = Math.min.apply(null, countMin)
      countMax.push(Data.main.temp_max)
      Temp_max = Math.max.apply(null, countMax)
      //// Close min and max temp

      return(
        <TouchableOpacity key={index} style={{ height:50, width:50, margin: 10, marginTop: 30 }} onPress={() => this._OnPress(Data)} >

          <Text style={ styles.Textmid }> {hours} {AM_PM} </Text>

          <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" style={{ height:'100%', width:'100%' }} source={{uri: 'https://openweathermap.org/img/wn/'+ Data.weather[0].icon + '@2x.png'}} />

          <Text style={ styles.Textmid }> {Data.main.temp}˚ </Text>
      
        </TouchableOpacity>

      )
    }); // Close array.map

    _OnPress = (data) => {

      
    };



    return (  
      <View style={styles.weatherContainer}>
        <View style={styles.headerContainer}>
          
          <Image style={styles.bgImage} blurRadius={0.5} source={{ uri: 'https://openweathermap.org/img/wn/'+ this.ImageNow + '@2x.png' }}/>
          
          <Text  style={styles.headerText} >{weatherNow.name}</Text>
          <Text  style={styles.headerTextsub} >{CurrentDate}</Text>
          <Text  style={styles.headerTextsub2} >min:{Temp_min}˚ max:{Temp_max}˚</Text> 

          <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" style={{width: 100, height: 100, resizeMode:'cover'}} source={{uri: 'https://openweathermap.org/img/wn/'+ weatherNow.weather[0].icon + '@2x.png'}} ></Animatable.Image>
         
          <Text style={styles.tempText}>{this.state.Temp}˚ </Text>
       
        </View>

        <View style={ styles.midContainer } >
          {itemList}
        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherNow.weather[0].main}</Text>
            <View style={{ flex:1 ,flexDirection:'row' }} >

              <View style={{ width: '50%' }} >
                <Text style={styles.subtitle}>Humidity</Text>
                <Text style={styles.subtitle}>Wind</Text>
                <Text style={styles.subtitle}>Pressure</Text>
              </View>

              <View style={{ width: '50%' }} >
                <Text style={styles.subtitle}>{weatherNow.main.humidity} %</Text>
                <Text style={styles.subtitle}>{weatherNow.wind.speed} km/h</Text>
                <Text style={styles.subtitle}>{weatherNow.main.pressure} mBar</Text>
              </View>
            </View>

        </View>


      </View>
    );
  }; // Close const Weather

  const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      backgroundColor: '#DFDAD9',
    },
    headerContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#000',
    },
    tempText: {
      fontSize: 62,
      color: '#97908E'
    },
    midContainer:{
      flex:1.5, 
      flexDirection: 'row', 
      justifyContent: 'center'
    },
    bodyContainer: {
      flex: 1.5,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 15,
    },
    title: {
      fontSize: 32,
      color: '#97908E'
    },
    subtitle: {
      fontSize: 15,
      color: '#97908E'
    },
    headerText:{ 
      fontSize: 38,
      color: '#97908E',
      position: 'absolute',  
      top: 20,
      left: 20,
      right: 0,
      bottom: 0,
    },
    headerTextsub:{ 
      fontSize: 20,
      color: '#97908E',
      position: 'absolute',  
      top: 62,
      left: 20,
      right: 0,
      bottom: 0,
    },
    headerTextsub2:{ 
      fontSize: 15,
      color: '#97908E',
      position: 'absolute',  
      top: 82,
      left: 20,
      right: 0,
      bottom: 0,
    },
    Textmid:{
      textAlign: 'center',
      color: '#000000'
    },
    bgImage:{
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      top: -100,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      width: '200%',
      height: '200%',
      // justifyContent: 'center',
    },
  }); // Close style

export default Weather;