import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView  from "react-native-maps";

 export default class JobOn_Map extends Component{

    

     render() {
         return (
              <View style={styles.main} >
                   <MapView 
                        style={{flex:1}}
                        provider='google' 
                        region={{
                        latitude: 40.76727216,
                        longitude: -73.99392888,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                        
                        {/* {
                            this.state.isLoading ? 
                            null
                            :
                            this.state.markers.map((marker , index)=>{
                            const coords = {
                            latitude:marker.latitude,
                            longitude:marker.longitude,  
                        };
                            const metadata = `Status: ${marker.statusValue}`;
                            return(
                                <Marker 
                                    key={index}
                                    coordinate={coords}
                                    title={marker.stationName}
                                    description={metadata}
                                />
                            )
                        })
                        } */}
                    </MapView>
              </View>
         );
     }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        // width:"100%",
        // backgroundColor:"pink",
        marginLeft:hp("-1.5%"),
        marginRight:hp("-1.5%"),
     },
 });