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

 function PumpComponent({Urgent, heading, Date, Service, Duration, PostedBy, Onpress}){
     return(
        <TouchableOpacity activeOpacity={0.5} onPress={Onpress} style={[styles.main, {backgroundColor:Urgent?"#FF4040":"#F2F2F2",}]} >
            <View style={styles.Top} >
                <Text style={[styles.heading, {color:Urgent?White:Primary}]} >{heading}</Text>
                <Text style={[styles.heading, {color:Urgent?White:Primary}]} >{Date}</Text>
            </View>

            <View style={styles.TxtAlign} >
                <FontAwesome name="bus" color={Urgent?Primary:"#979797"}  size={hp("2%")} />
                <Text style={[styles.Txt,{ color:Urgent?White:"#979797"}]} >{Service}</Text>
            </View>

            <View style={styles.TxtAlign} >
                <FontAwesome name="dollar" color={Urgent?Primary:"#979797"} size={hp("2%")} />
                <Text style={[styles.Txt,{ color:Urgent?White:"#979797"}]} > {Duration}</Text>
            </View>

            <View style={styles.TxtAlign} >
                <FontAwesome name="newspaper-o" color={Urgent?Primary:"#979797"} size={hp("2%")} />
                <Text style={[styles.Txt,{ color:Urgent?White:"#979797"}]}>{PostedBy}</Text>
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
        shadowRadius:4,
        elevation:4,
        shadowOffset:{width:0, height:3},
        borderWidth:hp("0.5%"),
        borderColor:"#E5E5E5",
        marginTop:hp("1.5%")
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
 })

 export default PumpComponent;