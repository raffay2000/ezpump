import React from 'react';
import { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const GooglePlacesInput = () => {
    const [region, setRegion] = useState({
        latitude: 37.80000,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
  return (
    <GooglePlacesAutocomplete
    styles={{container:{
        flex:0,
            width:widthPercentageToDP("100%"),
            zIndex:2,
            position:'absolute',
            bottom:heightPercentageToDP("35%"),
            padding:widthPercentageToDP("6%"),
        },
        listView:{
            backgroundColor:'#fff',
        }}}
      placeholder='Enter Your Address'
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
      }}
      listViewDisplayed={'auto'}
      query={{
        key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
        language: 'en',
        components:"country:us",
        types:"establishment",
        location: `${region.latitude},${region.longitude}`
      }}
    />
  );
};

export default GooglePlacesInput;