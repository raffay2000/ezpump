import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
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
      query={{
        key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;