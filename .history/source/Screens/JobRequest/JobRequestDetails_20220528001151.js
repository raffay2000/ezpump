import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import Give_Review from '../Job/Pump/Pump_Review';
import Cancel_Job from '../Job/Company/Cancel_Job';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import {ScreenTypeChange} from "../../Redux/Action/App_Action";
import { primary, white } from '../../assets/colors';
import {Button} from '../../ScreenComponent/common/Button';
import ConfirmApplyModal from '../../ScreenComponent/apply-job/ConfirmApplyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bold, regular } from '../../assets/fonts';

class JobRequestDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            Show_Modal:false,
            showAlert:false,
            Cancel_Modal:false,

            confirmModal: false,
            confirm: false,
        }
    }

    checkType = async() => {
       await AsyncStorage.getItem("Type", (err, data)=> {
               if(data === "Company"){
                   this.setState({Check_Type: true})
               }else{
                   this.setState({Check_Type: false})
               }
        })
    }
    componentDidMount(){
        this.checkType()
    }
    
    goToProfile = () => {
        this.props.navigation.navigate('Profile',{name: "Kevin Pump Co."})
    }
    acceptJob = () => {
        alert('accept')
    }
    rejectJob = () => {
        alert('reject')
    }
    render() {
        const {job} = this.props.route.params;
        console.log('job', job)
        return (
            <>
                <AppHeader 
                    Heading={"REQUEST DETAILS"}
                    borderRadius
                    IsBack={true}
                />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.Map}>
                        <Image source={require("../../assets/images/map.png")} style={{width:"100%", height:"100%"}} resizeMode="cover" />
                    </View>
                    <View style={styles.Container} >
                    
                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} >{job.job_detail.address_1}</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >{job.job_detail.address_2}</Text>
                            <View style={styles.ImageCont} >
                                <Ionicons name="location-sharp" color={white} size={hp("3%")} />
                            </View>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} >{job.job_detail.date} {job.job_detail.time}</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >On Site</Text>
                            <View style={styles.ImageCont} >
                                <AntDesign name="calendar" color={white} size={hp("3%")} />
                            </View>
                        </View>
                    </View>
                    
                    <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height: 'auto'}]} >
                        <Text onPress={this.goToProfile} style={styles.Txt} > {job.pump.name} </Text>
                        <Text style={styles.DesTxt}>
                            {job.job_request[0].proposal_description}
                        </Text>
                    </View>

                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Job Type</Text>
                            <Text style={styles.Txt} >{job.job_type.type_name}</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Pump Type</Text>
                            <Text style={styles.Txt} >{job.pump_type.type_name}</Text>
                        </View>
                    </View>

                    <View style={[styles.First, { borderBottomWidth:hp("0%"),}]} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Line Length</Text>
                            <Text style={styles.Txt} >{job.job_detail.line_length}</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Mᵌ</Text>
                            <Text style={styles.Txt} >{job.job_detail.m3}</Text>
                        </View>
                    </View>
                    {/* <View style={[styles.First]} >
                        <View style={[styles.miniContainer,{borderRightWidth:0}]} >
                            <Text style={[styles.Txt, {fontFamily: bold, fontSize:hp('2.5%'),color: primary}]} >10</Text>
                            <Text style={[styles.Txt,{ fontFamily: regular, color: primary}]} >Required Points</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily: bold, fontSize:hp('2.5%'), }]} >80</Text>
                            <Text style={[styles.Txt,{fontSize:hp('1.75%'), fontFamily: regular}]} >Available Points</Text>
                        </View>
                    </View> */}
                    <View style={[styles.First, { borderBottomWidth:hp("0.2%"), flexDirection:'column', justifyContent: 'space-evenly'}]} >
                        <Text style={[styles.txt,{ fontFamily: regular}]}>Bid Amount</Text>
                        <Text style={[styles.txt,{ fontFamily:  bold, fontSize: hp('3%')}]}>${job.job_request[0].bid_amount}</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:"space-evenly", margin: hp('2%')}}>
                        <TouchableOpacity onPress={this.acceptJob} style={[styles.btn,{backgroundColor: '#42ba96'}]}>
                            <Text style={[styles.Txt,{color: white}]}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.rejectJob} style={styles.btn}>
                            <Text style={[styles.Txt,{color:white}]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </>
        );
    }
}




export default JobRequestDetails;

const styles = StyleSheet.create({
    Map:{
        // flex:1,
        width:"100%",
        height:hp("20%"),
        backgroundColor:white,
    },
    Container:{
        width:"100%",
        flex:1,
        backgroundColor:white
    },
    First:{
        width:"100%",
        // flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:hp("0.2%"),
        borderColor:"#DBDBDB",
        borderBottomWidth:0,
        height:hp("12%"),
        // padding:hp("1.25%")
    },
    miniContainer:{
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        borderRightColor:"#DBDBDB",
        borderRightWidth:hp("0.1%"),
        height:"100%"
    },
    Txt:{
        fontSize:hp("1.8%"),
        fontFamily: bold,
        // lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        // marginTop:hp("1%")
    },
    ImageCont:{
        justifyContent:"center", 
        alignItems:"center",
        width:hp("5%"), 
        height:hp("5%"),
        backgroundColor:"#FF3B30",
        borderRadius:100,
        position:"absolute",
        top:hp("-2.5%")
    },
    btn:{
        height:hp("6%"),
        width:"40%",
        alignItems:'center',
        justifyContent:"center",
        borderRadius:hp("1.2%"),
        backgroundColor:"#FF4040",
    },
    DesTxt:{
        fontSize:hp("1.6%"),
        fontFamily: bold,
        lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%"),
        textAlign:"center"
    },



});
