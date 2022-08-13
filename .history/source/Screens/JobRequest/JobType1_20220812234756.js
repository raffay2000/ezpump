import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../../ScreenComponent/AppHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bold } from '../../assets/fonts';
import { black } from '../../assets/colors';

const JobType1 = () => {
  return (
    <View>
      <AppHeader 
                    Heading={"REQUESTS TYPE"}
                    notification
                    borderRadius
                />
      <Text style={styles.Heading}>Job Requests Type</Text>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{padding: hp('2%')}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <Text style={styles.Heading}>Job Requests</Text>
                    {/* {this.renderJobRequests()} */}
                    <View style={{height:hp("5%")}} />
                </ScrollView>
    </View>
  )
}

export default JobType1;

const styles = StyleSheet.create({
  Heading:{
    fontSize:hp("2.5%"),
    fontFamily:bold,
    color:black,
    marginLeft:hp('2%'),
    marginVertical:hp('1%'),
},
})