import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import MapView,{Callout,Marker} from "react-native-maps"

const Map_location = () => {
  const [x, setX] = useState({
    latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })
  return (
    <View>
      <MapView
      style={{height:"100%",width:"100%"}}
    initialRegion={x}
  >
    <Marker 
    draggable
    coordinate={x}
    onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
    >
      <Callout 

      />
    </Marker>
  </MapView>
    </View>
  )
}

export default Map_location

const styles = StyleSheet.create({})