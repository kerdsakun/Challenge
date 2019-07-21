import React, {Component} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_KEY, API_KEY } from './Keys/Keys';


// const NewYork = { description: 'New York', geometry: { location: { lat: 40.712776, lng: -74.005974 } }};
// const London = { description: 'London', geometry: { location: { lat: 51.507351, lng: -0.127758 } }};
// const Bangkok = { description: 'Bangkok', geometry: { location: { lat: 13.7244327, lng: 100.6033853 } }};

export class HomeScreen extends Component{

  constructor(props){
    super(props);

    this._Array = []
  };
  
  componentDidMount() {
    this._reQuestdata()
  };

  _reQuestdata()
  {
    fetch( `http://api.openweathermap.org/data/2.5/weather?lat=${40.712776}&lon=${-74.005974}&APPID=${API_KEY}&units=metric` )
    .then(res => res.json())
    .then(json => {
      Country_1 = json
      /// newyork

      fetch( `http://api.openweathermap.org/data/2.5/weather?lat=${51.507351}&lon=${-0.127758}&APPID=${API_KEY}&units=metric` )
      .then(res => res.json())
      .then(json => {
        Country_2 = json
        ///london

        fetch( `http://api.openweathermap.org/data/2.5/weather?lat=${13.7244327}&lon=${100.6033853}&APPID=${API_KEY}&units=metric` )
        .then(res => res.json())
        .then(json => {
          Country_3 = json
          ///bangkok

          this._Array.push(Country_1, Country_2, Country_3)

          this.setState({_Array: this._Array})
        
        }) // Close first fetch
        .catch((error) => {
          Alert.alert('ระบบขัดข้องกรุณาลองใหม่อีกครั้ง')
        });
        ///////////////////////////
  
      }) // Close first fetch
      .catch((error) => {
        Alert.alert('ระบบขัดข้องกรุณาลองใหม่อีกครั้ง')
      });
      ///////////////////////////

    }) // Close first fetch
    .catch((error) => {
      Alert.alert('ระบบขัดข้องกรุณาลองใหม่อีกครั้ง')
    });
  };// Close _reQuestdata

 
  render(){
    
    let itemList = this._Array.map((data, Index) => {
      return(
        <TouchableOpacity key={Index} style={ styles.listStyle } onPress={() => {
          let lat = data.coord.lat
          let lng = data.coord.lon
          this.props.navigation.navigate('Main', {lat,lng})
          }}
        >
          <View style={{ width: '50%', justifyContent: 'center' }} >
            <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#97908E' }} > {data.name} </Text>
          </View>

          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-end' }} >
            <Image style={{width: 70, height: 70, resizeMode:'cover'}} source={{uri: 'https://openweathermap.org/img/wn/'+ data.weather[0].icon + '@2x.png'}} ></Image>
            <Text style={{ fontWeight: 'bold', color: '#97908E', position: 'absolute', bottom: 0, right: 10  }} > {data.main.temp}˚ </Text>
          </View>
          
        </TouchableOpacity>
      )
    }); // Close array.map

    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: '#DFDAD9' }} >
        
        <View style={{ height: '10%', alignItems: 'center'}} >
          <View style={{ flex: 1, elevation: 5, zIndex: 1, position: 'absolute', width: '95%'}}>
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}

              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                let lat = details.geometry.location.lat
                let lng = details.geometry.location.lng
                this.props.navigation.navigate('Main', {lat,lng})
              }}

              getDefaultValue={() => ''}

              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_KEY,
                language: 'en', // language of the results
                // components: 'country:XX'// default: 'geocode'
        
              }}

              styles={{
                textInputContainer: {
                  width: '100%',
                  elevation: 5
                },
                description: {
                  fontWeight: 'bold'

                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                  

                },
                container:{
                  backgroundColor:'rgba(255, 255, 255, 0.7)', 
                  flex: 1
                }
              }}
            
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}
           
            />
          </View>
        </View>
        

        <View style={{ flex: 1, alignItems: 'center' }}>
          {itemList}
        </View>

      </SafeAreaView>
    )
  }
}; // Close Component

const styles = StyleSheet.create({
  listStyle:{ 
    width: '95%', 
    height: 80, 
    backgroundColor: '#DFDAD9',
    borderColor: 'black', 
    borderBottomWidth: 1, 
    justifyContent: 'center', 
    margin: 5,
    elevation: 2,
    flexDirection: 'row'
  }, 
}); // Close style





