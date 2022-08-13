import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
    styles={{container:{
            flex:0,
            width:widthPercentageToDP("100%"),
            height:heightPercentageToDP("6%"),
            zIndex:2,
            // position:'absolute',
            padding:25,
        },
        listView:{
            backgroundColor:'#fff',
        }}}
      placeholder='Enter Your Address'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
        language: 'en',
        components:"country:us",
        types:"establishment",
        // location: `${region.latitude},${region.longitude}`
      }}
    />
  );
};

export default GooglePlacesInput;