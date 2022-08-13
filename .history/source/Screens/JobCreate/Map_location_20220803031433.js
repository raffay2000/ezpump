import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'
import MapView,{Callout,Marker} from "react-native-maps"
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const Map_location = () => {
  const [x, setX] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })

  return (
    // <View style={{height:100,width:100}}>
<View style={{flex:1}}>
<ScrollView>
<GooglePlacesAutocomplete
 styles={{container:{
            flex:0,
            width:wp("100%"),
            zIndex:2,
            position:'absolute',
        },
        listView:{
            backgroundColor:'#fff',
        }}}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      fetchDetails={true}
      renderDescription={row => row.description}
      GooglePlacesSearchQuery={{rankby:"distance"}}
      listViewDisplayed={true}
      query={{
        key: 'AIzaSyAyr8EaOdpJ1M4NztKgspGZseYuU0mbEls',
        language: 'en',
        types:"establishment"
      }}
    />
      <MapView
      style={{flex:1,height:1000,width:"100%"}}
    initialRegion={x}>
    <Marker 
    draggable={true}
    // onSelect={(e)=>{console.log(e)}}
    // onTouchMove={(e)=>{console.log(e)}}
    coordinate={x}
    onDragEnd={(e) => setX({latitude: e.nativeEvent.coordinate.latitude,longitude: e.nativeEvent.coordinate.longitude})}
    >
    </Marker>
  </MapView>
  {/* <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <TextInput
     style={styles.input}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
  </View> */}
</ScrollView>
</View>
  )
}

export default Map_location

const styles = StyleSheet.create({
  input:{
      borderRadius: 10,
      margin: 10,
      color: '#000',
      borderColor: '#666',
      backgroundColor: '#FFF',
      borderWidth: 1,
      height: 45,
      paddingHorizontal: 10,
      fontSize: 18,
  },
})