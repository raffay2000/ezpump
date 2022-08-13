import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AutoComplete = () => {
  return (
    <View>
      <GooglePlacesAutocomplete
                        placeholder="Enter Address"
                        minLength={2} // minimum length of text to search
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data);
                            console.log(details);
                        }}
                        query={{
                            key: 'AIzaSyA-BHlG4dOA1CxtzZoTal7e_feMEAe8Fqc',
                            language: 'en',
                            components:"country:us",
                            types:"establishment",
                            // location: `${region.latitude},${region.longitude}`,
                        }}
                    />
    </View>
  )
}

export default AutoComplete;
// const styles = StyleSheet.create({})