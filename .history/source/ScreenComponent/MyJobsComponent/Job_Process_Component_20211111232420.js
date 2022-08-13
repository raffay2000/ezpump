import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Primary, White } from '../color';
import { Bold, Regular } from '../Fonts';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useDispatch } from 'react-redux';
import { ScreenTypeChange } from '../../Redux/Action/App_Action';

 function Job_Process_Component({Urgent, heading, Date, Duration, PostedBy, Onpress}){
     

     return(
        <TouchableOpacity onPress={Onpress} activeOpacity={0.8} style={[styles.main, {backgroundColor:Urgent?"#FF4040":"#F2F2F2",}]} >
            <View style={styles.Top} >
                <Text style={[styles.heading, {color:Primary}]} >{heading}</Text>
                <Text style={[styles.heading, {color:Primary}]} >{Date}</Text>
            </View>

            {/* <View style={styles.TxtAlign} >
                <FontAwesome name="bus" color={Urgent?Primary:"#979797"}  size={hp("2%")} />
                <Text style={[styles.Txt,{ color:Urgent?White:"#979797"}]} >{Service}</Text>
            </View> */}

            <View style={styles.TxtAlign} >
                <FontAwesome name="dollar" color={"#979797"} size={hp("2%")} />
                <Text style={[styles.Txt,{ color:"#979797"}]} > {Duration}</Text>
            </View>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:'space-between'}} >
                <View style={styles.TxtAlign} >
                    <FontAwesome name="newspaper-o" color={Urgent?Primary:"#979797"} size={hp("2%")} />
                    <Text style={[styles.Txt,{ color:Urgent?White:"#979797"}]}>{PostedBy}</Text>
                </View>
                <View style={styles.btn} >
                    <Text style={[styles.Txt, {marginLeft:0, color:White}]} > View Details </Text> 
                </View>
            </View>
            
        </TouchableOpacity>
     );
 }

 const styles = StyleSheet.create({
    main:{
        width:"100%",
        // height:hp("8%"),
        padding:hp("1.25%"),
        borderRadius:hp("1%"),
        shadowColor:"#00000029",
        shadowRadius:3,
        elevation:4,
        shadowOffset:{width:0, height:3},
        borderWidth:hp("0.15%"),
        borderColor:"#E5E5E5",
        marginTop:hp("2%")
    },
    Top:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:hp("1.5%")
    },
    heading:{
        fontSize:hp("2%"),
        fontFamily:Bold,
        lineHeight:hp("2.2%"),
        letterSpacing:1
    },
    TxtAlign:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:hp("1%")
    },
    Txt:{
        fontSize:hp("1.6%"),
        fontFamily:Regular,
        lineHeight:hp("1.5%"),
        marginLeft:hp("2.2%")
    },
    btn:{
        minWidth:"25%",
        maxWidth:"35%",
        height:hp("4%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#979797",
        borderRadius:hp("0.8%"),
        paddingHorizontal:hp("1%")
    }
 })

 export default Job_Process_Component;