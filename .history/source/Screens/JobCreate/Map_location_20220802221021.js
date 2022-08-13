import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView,{Callout,Marker} from "react-native-maps"

const Map_location = () => {
  return (
    <View>
      <MapView
      style={{flex:1}}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    </View>
  )
}

export default Map_location

const styles = StyleSheet.create({})