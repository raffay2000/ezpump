import { StyleSheet, Text, View } from 'react-native'

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react'
import { useState } from 'react';

const SearchGoogle = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
  return (
    <View>
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
        console.log("Data",data);
        setRegion({
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
        })
      }}
      renderDescription={row => row.description}
      onFail={(error) => {console.log(error)}}
      fetchDetails={true}
      listViewDisplayed={'auto'}
      query={{
        key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
        language: 'en',
        components:"country:us",
        types:"establishment",
        location: `${region.latitude},${region.longitude}`,
      }}
    />
    </View>
  )
}

export default SearchGoogle

const styles = StyleSheet.create({})