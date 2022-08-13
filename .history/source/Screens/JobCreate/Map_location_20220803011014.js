import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'
import MapView,{Callout,Marker} from "react-native-maps"
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const Map_location = () => {
  const [x, setX] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })
  return (
    // <View style={{height:100,width:100}}>
<View>

<ScrollView>

      <MapView
      style={{height:"100%",width:"100%"}}
    initialRegion={x}>
    <Marker 
    draggable
    coordinate={x}
    onDragEnd={(e) => setX({latitude: e.nativeEvent.coordinate.latitude,longitude: e.nativeEvent.coordinate.longitude})}
    >
    </Marker>
  </MapView>
  <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <TextInput
      style={{
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
      }}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
  </View>
</ScrollView>
</View>
  )
}

export default Map_location

const styles = StyleSheet.create({})