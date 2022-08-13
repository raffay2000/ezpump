import { StyleSheet, Text, View } from 'react-native'

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react'

const SearchGoogle = () => {
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

        // console.log("Data",data,"details", details);
      }}
      renderDescription={row => row.description}
      onFail={(error) => {console.log(error)}}
      fetchDetails={true}
    
      listViewDisplayed={'auto'}
      query={{
        key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
        language: 'en',
        components:"country:us",
        types:"establishment"
      }}
    />
    </View>
  )
}

export default SearchGoogle

const styles = StyleSheet.create({})