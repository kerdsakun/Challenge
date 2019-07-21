import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { API_KEY } from './Keys/Keys';
import Weather from './Components/Weather';


export class MainScreen extends Component{
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    Icon: null,
    array_1: null,
    array_2: null,
    array_3: null,
    array_4: null,
    array_5: null,
    array_6: null,
    weatherNow: [],
  };


  componentDidMount() {
    this.fetchWeather();
  
  };

  fetchWeather(Lat = this.props.navigation.state.params.lat, Lng = this.props.navigation.state.params.lng) {
    fetch(

      `http://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lng}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          array_1: json.list[0],
          array_2: json.list[1],
          array_3: json.list[2],
          array_4: json.list[3],
          array_5: json.list[4],
          array_6: json.list[5],

        },() => {
          fetch(
            
            `http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lng}&APPID=${API_KEY}&units=metric`
          )
            .then(res => res.json())
            .then(json => {
              // console.log(json)
              this.setState({
                weatherNow: json,
                isLoading: false
              });
            });
        }); // Close first setState
      }); // Close first fetch
  }; // Close Fetchweather

  render() {
    const { isLoading, array_1, array_2, array_3, 
            array_4, array_5, array_6, weatherNow
          } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Animatable.Image animation="fadeOut" direction="alternate" iterationCount="infinite" style={{width: 100, height: 100}} source={{uri: 'http://openweathermap.org/img/wn/11d@2x.png'}} ></Animatable.Image>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <Weather 
            array_1={array_1} 
            array_2={array_2} 
            array_3={array_3} 
            array_4={array_4} 
            array_5={array_5} 
            array_6={array_6} 
            weatherNow={weatherNow}
          />
        )}
      </SafeAreaView>
    );
  } // Clase render

}; /// Close class

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',

    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DFDAD9'
    },
    loadingText:{
      fontWeight: 'bold'
    }
  }); // close style



