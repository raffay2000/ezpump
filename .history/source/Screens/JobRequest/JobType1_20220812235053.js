import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AppHeader from '../../ScreenComponent/AppHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bold } from '../../assets/fonts';
import { black } from '../../assets/colors';

const JobType1 = () => {
  const [refreshing, setRefreshing] = useState(false)
  const OnRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
  return (
    <View>
      <AppHeader 
                    Heading={"REQUESTS TYPE"}
                    notification
                    borderRadius
                />
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{padding: hp('2%')}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={OnRefresh}
                        />
                    }
                >
                <Text style={styles.Heading}>Job Requests Type</Text>
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