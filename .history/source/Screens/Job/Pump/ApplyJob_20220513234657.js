import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Alert
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import Give_Review from '../../Job/Pump/Pump_Review';
import Cancel_Job from '../../Job/Company/Cancel_Job';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import {ScreenTypeChange} from "../../../Redux/Action/App_Action";
import { black, primary, white } from '../../../assets/colors';
import {Button} from '../../../ScreenComponent/common/Button';
import ConfirmApplyModal from '../../../ScreenComponent/apply-job/ConfirmApplyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bold, regular } from '../../../assets/fonts';

class ApplyJob extends Component{

    constructor(props){
        super(props);
        this.state={
            Show_Modal:false,
            Check_Type:false, //true for company and false for pump
            // screenType:this.props.route.params.type,
            showAlert:false,
            Cancel_Modal:false,

            confirmModal: false,
            confirm: false,

            isPending: false,
            // Show_CancelModal:false,
            // showCompleteJobModal:false
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
 
   
    onConfirmApplyPress = ()=> {
        this.setState({confirm: true, confirmModal: false})
        this.setState({isPending: true})
    }

    render() {
        return (
            <>
                <AppHeader 
                    Heading={"JOB DETAILS"}
                    borderRadius
                    IsBack={true}
                />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.Map}>
                        <Image source={require("../../../assets/images/map.png")} style={{width:"100%", height:"100%"}} resizeMode="cover" />
                    </View>
                    <View style={styles.Container} >
                    
                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} > {this.state.Approved || this.state.Completed?"Carrum Down, VIC":"Private"}</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >{this.state.Approved || this.state.Completed?"6 Eucalyptus Walk":"Address"}</Text>
                            <View style={styles.ImageCont} >
                                <Ionicons name="location-sharp" color={white} size={hp("3%")} />
                            </View>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={styles.Txt} >Tue 21, June</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >On Site 9:00AM</Text>
                            <View style={styles.ImageCont} >
                                <AntDesign name="calendar" color={white} size={hp("3%")} />
                            </View>
                        </View>
                    </View>
                    {this.state.isPending
                        &&
                            <>
                                <View style={[styles.First, {flexDirection:"column", justifyContent:"center", height:hp("25%")}]} >
                                    <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                                        Job Request is Pending
                                    </Text>
                                </View>
                            </>
                    }
{/* //////////////////////////////////// */}
                    <View style={styles.First} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Job Type</Text>
                            <Text style={styles.Txt} >{this.state.Approved || this.state.Completed?"Slab":"-"}</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Pump Type</Text>
                            <Text style={styles.Txt} >{this.state.Approved || this.state.Completed ?"Line":"-"}</Text>
                        </View>
                    </View>

                    <View style={[styles.First, { borderBottomWidth:hp("0%"),}]} >
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Line Length</Text>
                            <Text style={styles.Txt} >{this.state.Approved || this.state.Completed?"45":"-"}</Text>
                        </View>
                        <View style={styles.miniContainer} >
                            <Text style={[styles.Txt, {fontFamily:regular}]} >Mᵌ</Text>
                            <Text style={styles.Txt} >{this.state.Approved || this.state.Completed?"30":"-"}</Text>
                        </View>
                    </View>
                    {!this.state.isPending
                        &&
                        <>
                            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height: 'auto'}]} >
                                <Text style={styles.DesTxt} > Job Description </Text>
                                <Text style={styles.DesTxt}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since
                                </Text>
                            </View>
                            <View style={[styles.First]} >
                            <View style={[styles.miniContainer,{borderRightWidth:0}]} >
                                <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'),color: primary}]} >10</Text>
                                <Text style={[styles.Txt,{ fontFamily: regular, color: primary}]} >Required Points</Text>
                            </View>
                            <View style={styles.miniContainer} >
                                <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'), }]} >80</Text>
                                <Text style={[styles.Txt,{fontSize:hp('1.75%'), fontFamily: regular}]} >Available Points</Text>
                            </View>
                            <Ionicons onPress={()=>Alert.alert("Points Information", "Points are required to apply on the jobs. The number of points specified as required points will be deducted from your account when you apply.")} name="information-circle" size={24} color={black} style={{position:'absolute', top:hp('1%'), left: hp('1%')}} />
                        </View>
                        <View style={[styles.First, { borderBottomWidth:hp("0.2%"), flexDirection:'column', justifyContent: 'space-evenly'}]} >
                            <Text style={[styles.txt,{ fontFamily: regular}]}>Bid Range</Text>
                            <Text style={[styles.txt,{ fontFamily: bold, fontSize: hp('3%')}]}>$1200 - $1600</Text>
                            {/* <View style={[styles.miniContainer,{borderRightWidth:0}]} >
                                <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'),color: primary}]} >10</Text>
                                <Text style={[styles.Txt,{ fontFamily: regular, color: primary}]} >Required Points</Text>
                            </View>
                            <View style={styles.miniContainer} >
                                <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'), }]} >80</Text>
                                <Text style={[styles.Txt,{fontSize:hp('1.75%'), fontFamily: regular}]} >Available Points</Text>
                            </View> */}
                        </View>
                        <View style={{backgroundColor:'#DBDBDB', padding: hp('3%')}}>
                            <Text style={{fontFamily: regular, fontSize: hp('2.25%'), textAlign:'center'}}>Write a Proposal</Text>
                            <TextInput
                                style={{
                                    height:'auto',
                                    minHeight: hp('25%'),
                                    backgroundColor:white,
                                    borderRadius: hp('1%'),
                                    marginTop: hp('2%'),
                                    padding:hp('2%'),
                                }}
                                multiline
                                placeholder={"Description"}
                            />
                            <View 
                                style={{
                                    backgroundColor:white,
                                    borderRadius: hp('1%'),
                                    marginTop: hp('2%'),
                                    flex:1,
                                    flexDirection:'row',
                                    paddingHorizontal:hp('2%'),
                                    padding:hp('1%'),
                                    justifyContent:'space-between',
                                    alignItems:'center'
                                }}
                            >
                                <Text style={{fontFamily:regular, fontSize: hp('2%')}}>Bid Amount</Text>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={{fontFamily:bold, fontSize: hp('2.25%')}}>$</Text>
                                    <TextInput
                                        style={{
                                            backgroundColor:'#DBDBDB',
                                            height:hp('6%'),
                                            borderRadius:hp('1%'),
                                            fontSize:hp('2%'),
                                            paddingHorizontal:hp('2%'),
                                            marginLeft:hp('1%'),
                                        }}
                                        placeholder="000"
                                    />
                                </View>
                            </View>
                            <Button
                                style={{width:'50%', alignSelf: 'center', marginTop: hp('2.5%')}}
                                color={primary}
                                textColor={white}
                                text={"Send Proposal"}
                                onPress={()=>this.setState({confirmModal: true})}
                            />
                        </View>
                        </>
                    }
                </View>
                <ConfirmApplyModal
                    visible={this.state.confirmModal}
                    points={6}
                    onBackPress={()=>this.setState({confirmModal: false})}
                    onPress={this.onConfirmApplyPress}
                />
                <AwesomeAlert 
                    show={this.state.showAlert}
                    message="Do you want to mark this Job as Completed?"
                    messageStyle={{ fontSize:hp("1.7%")}}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    showCancelButton={true}
                    confirmText="Yes"
                    onCancelPressed={()=> this.setState({showAlert: false})}
                    onConfirmPressed={this.Result}
                    contentContainerStyle={{width:hp("50%") , height:hp("15%") , backgroundColor:"#FFFFFF"}}
                    confirmButtonColor="#FF3B30"
                    cancelButtonColor="#979797"
                    confirmButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0,lineHeight:hp("1.9%") }}
                    cancelButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0,lineHeight:hp("1.9%") }}
                />
               
           
                </ScrollView>
                </>
        );
    }
}


function mapStateToProps(state) {
    return{
        ScreenType:state.appReducer.ScreenType
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplyJob);

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
        fontFamily:bold,
        // lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%")
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
        width:"50%",
        alignItems:'center',
        justifyContent:"center",
        borderRadius:hp("1.2%"),
        backgroundColor:"#FF4040",
    },
    DesTxt:{
        fontSize:hp("1.6%"),
        fontFamily:bold,
        lineHeight:hp("1.8%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("1%"),
        textAlign:"center"
    },
    btn1:{
        height:hp("6%"),
        width:"50%",
        alignItems:'center',
        justifyContent:"space-evenly",
        borderRadius:hp("1.2%"),
        backgroundColor:white,
        flexDirection:"row",
        borderColor:"#707070",
        borderWidth:hp("0.1%"),
        marginTop:hp("1%")
    },
    Voucher:{
        width:hp("100%"),
        height:hp("7%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#F3E183",
        marginTop:hp("2%"),
        marginBottom:hp("1%"),
    },
    ModalContainer:{
        width:"100%",
        height:hp("70%"),
        backgroundColor:"#FFFFFF",
        padding:hp("2%")
    },
    Btn_Container:{ 
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between", 
        width:"90%", 
        marginTop:hp("2%") 
    }


});
