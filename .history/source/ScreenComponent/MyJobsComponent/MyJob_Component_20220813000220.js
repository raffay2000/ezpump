import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { bold, regular } from '../../assets/fonts';
import { primary } from '../../assets/colors';
import {toTitleCase} from '../../utils'

export const My_Job_Component = ({heading, onPress, date, service, price , pumpType, status, statusColor}) => {
        return(
                <TouchableOpacity onPress={onPress} style={styles.main} >
                    
                    <View style={styles.Container} >
                        <Text style={styles.Heading} > {heading.toUpperCase()} </Text>
                        <Text style={styles.Heading} > {date} </Text>
                    </View>

                    {
                        service &&
                            <View style={styles.Container} >
                                <View style={styles.TxtAlign} >
                                    <MaterialIcon name="briefcase" color="#00000029" size={hp("3%")} />
                                    <Text style={styles.Txt} > {toTitleCase(service) }  </Text>
                                </View>
                            </View>
                    }

                   
                    <View style={[styles.TxtAlign, {marginTop:hp("1%")}]} >
                        <FontAwesome name="dollar" color="#00000029" size={hp("2.5%")} style={{marginLeft: hp('1%'),}} />
                        <Text style={[styles.Txt,{marginLeft: hp('2.5%')}]} > {price}  </Text>
                    </View>

                    
                    <View style={styles.Container} >
                        <View style={styles.TxtAlign} >
                            <Fontisto name="truck" color="#00000029" size={hp("3%")} style={{marginLeft: hp('0.5%')}} />
                            <Text style={styles.Txt} > {toTitleCase(pumpType)} </Text>
                        </View>
                    
                        <View activeOpacity={0.8} style={[styles.btn, {backgroundColor:statusColor}]} >
                            <Text style={styles.Btn_Txt} >  {status} </Text>
                        </View> 
                        
                    </View>

                </TouchableOpacity>
        );
}

 export const  ReceivedJobs=({fromJob, Heading, Date, Person, onPress, onDeclined, onOfferred })=>  {
    const [response, setResponse] = useState('')
    const [reqNumber, setReqNumber] = useState(0)
    return(
        <TouchableOpacity onPress={onPress} style={styles.main} >
        {reqNumber > 0 && <View style={styles.reqNumber} />}
            <Text style={[styles.Heading,{color: 'gray', marginVertical:hp('1%')}]}>From Job, {fromJob}</Text>
            <Text style={styles.Heading} > {Heading} </Text>
            <View style={styles.Container} >
                <View style={styles.TxtAlign} >
                    <AntDesign name="calendar" color="#00000029" size={hp("3%")} />
                    <Text style={styles.Txt} > {Date}  </Text>
                </View>
                {/* {response == '' &&
                    <TouchableOpacity activeOpacity={0.8} style={[styles.btn, {backgroundColor:"#86AA0C"}]} onPress={()=>setResponse('offerred')} >
                        <Text style={styles.Btn_Txt} >  Offer Job </Text>
                    </TouchableOpacity>
                } */}
            </View>

            <View style={styles.Container} >
                <View style={styles.TxtAlign} >
                    <MaterialIcons name="person" color="#00000029" size={hp("3%")} />
                    <Text style={styles.Txt} > {Person} </Text>
                </View>
                {/* {response == ''
                    ? 
                    <TouchableOpacity activeOpacity={0.8} style={[styles.btn, {backgroundColor:"#FF4040"}]} onPress={()=>setResponse("decline")} >
                        <Text style={styles.Btn_Txt} > Decline Job </Text>
                    </TouchableOpacity> 
                    :
                    response=="decline"
                        ?
                        <View activeOpacity={0.8} style={[styles.btn, {backgroundColor:"#FF4040"}]}>
                            <Text style={styles.Btn_Txt} > Job Declined </Text>
                        </View> 
                        :
                        <View activeOpacity={0.8} style={[styles.btn, {backgroundColor:"#86AA0C"}]} >
                            <Text style={styles.Btn_Txt} > Job Offered </Text>
                        </View> 
                 
              
                } */}
                
            </View>

        </TouchableOpacity>
     );
 }

 const styles = StyleSheet.create({
     main:{
        width:"100%",
        // height:hp("8%"),
        padding:hp("1.25%"),
        backgroundColor:"#F2F2F2",
        borderRadius:hp("1%"),
        shadowColor:"#00000029",
        shadowRadius:6,
        elevation:4,
        shadowOffset:{width:0, height:3},
        borderWidth:hp("0.15%"),
        borderColor:"#E5E5E5",
        marginTop:hp("1.5%")
    },
    Heading:{
        fontSize:hp("2%"),
        fontFamily:bold,
        color: primary,
        lineHeight:hp("2.2%"),
        letterSpacing:1
    },
    Container:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:hp("1%")
    },
    TxtAlign:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    Txt:{
        fontSize:hp("1.75%"),
        fontFamily: regular,
        color:"#979797",
        marginLeft:hp("2%"),
    },
    btn:{
        width:"35%",
        // minWidth:"30%",
        // maxWidth:"40%",
        height:hp("4%"),
        paddingHorizontal:hp("1%"),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:hp("0.8%"),
    },
    Btn_Txt:{
        fontSize:hp("1.6%"),
        fontFamily:bold,
        color: 'white',
        lineHeight:hp("1.8%"),
        letterSpacing:1
    },
    reqNumber:{
        width:hp("1%"),
        height:hp("1%"),
        backgroundColor:primary,
        borderRadius:hp("0.5%"),
        position:"absolute",
        top:hp("-0.5%"),
        right:hp("-0.5%")
    }
 });

//  export default MyJob_Component;