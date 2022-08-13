import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import MapView,{Callout,Marker} from "react-native-maps"

const Map_location = () => {
  const [x, setX] = useState()
  return (
    <View>
      <MapView
      style={{height:"100%",width:"100%"}}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker 
    
    coordinate={x}
    onDragEnd={(e) => setX(e)}
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