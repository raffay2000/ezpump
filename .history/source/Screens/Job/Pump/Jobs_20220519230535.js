import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import AntDesign from "react-native-vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobList from './JobList';
import JobOn_Map from './JobOn_Map';
import { TabView, SceneMap } from "react-native-tab-view";
import { useNavigation } from '@react-navigation/native';
import { primary, white } from '../../../assets/colors';
import { regular } from '../../../assets/fonts';
import Modal from '../../../ScreenComponent/common/Modal';

 export default class Jobs extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }
     render(){
         return(
           <>
                <AppHeader 
                    Heading={"JOBS"}
                    borderRadius
                    notification
                />

                <View style={styles.main} >
                    <JobList navigation={this.props.navigation} />
                    <View style={styles.FilterContainer} >
                        <Mark_Filter
                            FilterName="Distance"
                            Type="Any"
                        />
                        <Mark_Filter
                            FilterName="Pump Type"
                            Type="Any"
                            OtherStyle={{borderLeftColor:"white", borderLeftWidth:1, borderRightColor:"white", borderRightWidth:1  }}
                        />
                        <Mark_Filter
                            FilterName="Job Type"
                            Type="Any"
                        />
                    </View>
                   
                </View>
           </>
         );
     }
 }

// const Job_List = () => {
//     const navigation = useNavigation();
//     return(
//         <View style={{padding:hp("1.5%"), paddingTop:0, paddingBottom:0}} >
//             <JobList navigation={navigation} />
//         </View>
//     )
// }
// const Job_OnMap = () => (
//     <JobOn_Map />
// );

 function Mark_Filter({FilterName, Type, OtherStyle}) {
     return(
        <TouchableOpacity style={{flex:1, height:"100%", paddingTop:hp("1.5%"),alignItems:"center", justifyContent:"center", ...OtherStyle}} >
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center",marginBottom:hp("1%")}} >
                <Text style={[styles.TopTxt, {letterSpacing:0.5}]} > {FilterName} </Text>
                <AntDesign name="caretdown" color="white" size={hp("1.5%")} style={{marginBottom:2}} />
            </View>
            <Text style={[styles.TopTxt, {letterSpacing:0.5, alignSelf:"center"}]} > {Type} </Text>
        </TouchableOpacity>
     );
 }

 const styles = StyleSheet.create({
   
    main:{
        flex:1,
        backgroundColor:white,
        justifyContent:"space-between"
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    Top:{
        width:"100%",
        height:hp("5%"),
        backgroundColor:primary,
        borderBottomRightRadius:hp("2%"),
        borderBottomLeftRadius:hp("2%"),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
    },
    TopTxt:{
        flexDirection: 'row',
        fontSize:hp("1.6%"),
        fontFamily:regular,
        lineHeight:hp("1.7%"),
        color:"#FFFFFF",
        letterSpacing:2,
    },
    FilterContainer:{
        // position:"absolute",
        // bottom:hp("-1%"),
        width:"100%",
        height:hp("7%"),
        backgroundColor:"#505050",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
 });