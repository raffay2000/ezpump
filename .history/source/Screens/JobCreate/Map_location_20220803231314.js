import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState,useRef} from 'react'
import MapView,{Callout,Marker} from "react-native-maps"
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SearchGoogle from "./SearchGoogle"
import {Button } from "../../ScreenComponent/common/Button"
import { primary } from '../../assets/colors';
const Map_location = ({navigation}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.80000,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
})
const gotoCreateJob = () => {
  navigation.navigate('CreateJob',{region})
}
  return (
    // <View style={{height:100,width:100}}>
<View style={{flex:1}}>
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
      onPress={async(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log("Data",details.geometry.location);
        const description = data.description
        console.log("Description",description);
         setRegion({
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
      }}
      renderDescription={row => row.description}
      // onFail={(error) => {console.log(error)}}
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
      <MapView
      style={{flex:1,height:1000,width:"100%"}}
    initialRegion={{
      latitude: 37.80000,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    region={region}
    onTouchMove={(e)=>{
      setRegion({
        latitude:e.nativeEvent.changedTouches[0].locationX,
        longitude:e.nativeEvent.changedTouches[0].locationY,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        });
      // setRegion({
      //   // latitude:e.nativeEvent.locationX,
      //   // longitude:e.nativeEvent.locationY,
      //   // latitudeDelta: 0.0922,
      //   // longitudeDelta: 0.0421,
      // });
    }}
    >

    <Marker 
    ref={mapRef}
    coordinate={region}
    draggable
    zoomControlEnabled={true}
    // onSelect={(e)=>{console.log("Event",e)}}
    // onTouchMove={(e)=>{console.log("Event",e)}}
    // calloutOffset={{x: 0, y: 0}}
    // centerOffset={{x: 0, y: 0}}
    // anchor={{x:region.latitude, y:region.longitude}}
    onDragStart={(e)=>{
      console.log(e.nativeEvent.coordinate)
      setRegion({
      latitude:e.nativeEvent.coordinate.latitude,
      longitude:e.nativeEvent.coordinate.longitude,
      })}}

    onDragEnd={(e) => {
      console.log(e.nativeEvent.coordinate);
      setRegion({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
        })}}
    >
    </Marker>
  </MapView>
  {/* <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <TextInput
     style={styles.input}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
  </View> */}
  <Button
color={primary}
onPress={gotoCreateJob}
text="Select Location"
textColor={"#fff"}
// loading={}
style={{position:"absolute",bottom:10,width:"90%",height:hp("6%"),alignSelf:"center",alignItems:"center",justifyContent:"center"}}
  />
</View>
  )
}

export default Map_location

const styles = StyleSheet.create({
  input:{
      borderRadius: 10,
      margin: 10,
      color: '#000',
      borderColor: '#666',
      backgroundColor: '#FFF',
      borderWidth: 1,
      height: 45,
      paddingHorizontal: 10,
      fontSize: 18,
  },
})