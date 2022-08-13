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
import { black, primary, secondary, white } from '../../assets/colors';
import {Button} from '../../ScreenComponent/common/Button';
import ConfirmApplyModal from '../../ScreenComponent/apply-job/ConfirmApplyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bold, regular } from '../../assets/fonts';

class Find_Job extends Component{

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

   
    // componentDidMount(){
    //     // this.checkType()
    // }
    completeJobModalConfirm = () => {
        this.setState({showCompleteJobModal: false})
        this.props.navigation.navigate("JobCompleted")
    }
    ApplyForJob=()=>{
        // this.setState({screenType:"pending"})
        this.props._ScreenType("pending")
        // this.props.navigation.navigate("Job_Process")
    }

    onPayPress=()=>{
        // this.setState({screenType:"approved"},()=>{
            this.props.navigation.navigate("PaymentForm",{type:'Pump'})
        // })
        // this.setState({Apply: false, Pending:false, Approved:true})
    }
    renderSections = () => {
        const userType = this.props.userType == 'company';
        const {job} = this.props.route.params;
        if(this.props.ScreenType == "applied"){
            return(
                <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height: 'auto'}]} >
                    <Text style={styles.DesTxt} > Job Description </Text>
                    <Text style={styles.DesTxt}>
                        {job.job_detail.description}
                    </Text>
                </View>
            )
        }
        else if(this.props.ScreenType == "pending"){
            return (
                <Job_Pending onPress={this.onPayPress} />
            )
        }
        else if(this.props.ScreenType == "approved"){
            return(
                <Job_Approved 
                    onPress={()=> this.props.navigation.navigate("Profile",{name:"John's Constructions"})}
                />
            )
        }
        else if(this.props.ScreenType == "completed"){
            return(
                <Job_Completed 
                    onPress={()=> this.setState({Show_Modal: true})}
                    ViewProfile={()=> this.props.navigation.navigate("Profile",{name:"John's Constructions"})}
                />
            )
        }
        else if(this.props.ScreenType == "cancelled"){
            return(
                <Job_Cancelled 
                    ViewProfile={()=> this.props.navigation.navigate("Profile",{name:"John's Constructions"})}
                />
            )
        }
        else if(this.props.ScreenType == "inprogress"){
            return(
                <Jop_InProcess
                    isCompany={userType}
                    AlertPress={()=> this.setState({showAlert: true})}
                    ModalPress={()=> this.setState({Cancel_Modal: true})}
                    ViewProfile={()=> this.props.navigation.navigate("Profile",{name:"John's Constructions"})} />
            )
        }

        else if(this.props.ScreenType == "rejected"){
            return(
                <Job_Declined  onPress={()=> this.props.navigation.navigate("Jobs")}/>
            )
        }
       
    }

    confirmJobCompleted = () => {
        this.setState({showAlert: false})
        this.props.navigation.navigate("JobCompleted")
    }
    onConfirmApplyPress = ()=> {
        this.setState({confirm: true, confirmModal: false})
        this.props._ScreenType("approved")
    }

    render() {
        const job = this.props.route.params.job;
        return (
            <>
                <AppHeader 
                    Heading={"JOB DETAILS"}
                    borderRadius
                    IsBack
                />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.Map}>
                        <Image source={require("../../assets/images/map.png")} style={{width:"100%", height:"100%"}} resizeMode="cover" />
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
                            <Text style={styles.Txt} >{job.job_detail.date}</Text>
                            <Text style={[styles.Txt, {fontFamily:regular}]} >On Site  {job.job_detail.time}</Text>
                            <View style={styles.ImageCont} >
                                <AntDesign name="calendar" color={white} size={hp("3%")} />
                            </View>
                        </View>
                    </View>
                    
                    {this.renderSections()}
                   

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
                    {/* job apply section was here */}
                </View>

                <Modal
                    isVisible={this.state.Show_Modal}
                    onBackButtonPress={()=> this.setState({Show_Modal: false})}
                    onBackdropPress={()=> this.setState({Show_Modal: false})}
                    animationInTiming={600}
                    animationOutTiming={200}
                    style={{flex:1}}
                >
                    <View style={styles.ModalContainer}>
                        <Give_Review onPress={()=> this.setState({Show_Modal:false})} />
                    </View>

                </Modal>

                <Modal
                    isVisible={this.state.Cancel_Modal}
                    onBackButtonPress={()=> this.setState({Cancel_Modal: false})}
                    onBackdropPress={()=> this.setState({Cancel_Modal: false})}
                    animationInTiming={600}
                    animationOutTiming={200}
                    style={{flex:1}}
                >
                    <View style={[styles.ModalContainer, {height:hp("45%")}]}>
                       <Cancel_Job onPress={()=> this.setState({Cancel_Modal:false})} />
                    </View>

                </Modal>
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
                    onConfirmPressed={this.confirmJobCompleted}
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

function  Job_Pending({onPress}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center", height:hp("25%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                    Job Request is Pending
                </Text>
            </View>
        </>
    )
}

function  Job_Approved({onPress}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("16%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                    Congratulations You got this job!
                </Text>

                <TouchableOpacity onPress={()=>alert('calling')} style={[styles.btn,{marginTop:hp("1%"), flexDirection:"row", justifyContent:"space-evenly"}]} >
                    <FontAwesome name="phone" color={white} size={hp("3%")} />
                    <Text style={[styles.Txt, {color:white, marginTop:0}]} >+1 (456) 4567</Text>
                </TouchableOpacity>
            </View>
            
            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Jack &amd; Jack Company </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={onPress} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}
function  Job_Completed({onPress, ViewProfile}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("16%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                        Job has been Completed
                </Text>

                <TouchableOpacity onPress={onPress} style={[styles.btn,{marginTop:hp("1%"), flexDirection:"row", justifyContent:"space-evenly"}]} >
                    <Text style={[styles.Txt, {color:white, marginTop:0}]} >Submit Review</Text>
                </TouchableOpacity>
            </View>
            
            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Norway Concrete Pump </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={ViewProfile} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}

function  Job_Cancelled({ViewProfile}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("16%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center", color:secondary}]} >
                    Job has been Cancelled
                </Text>
            </View>
            
            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Norway Concrete Pump </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={ViewProfile} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}

function  Job_Declined({onPress}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center",height:hp("20%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("1.9%"), lineHeight:hp("2%"), width:"50%", textAlign:"center", color:secondary}]} >
                    This Job has been Declined
                </Text>

                <TouchableOpacity onPress={onPress} style={[styles.btn, {alignSelf:"center", marginTop:hp("3%"), height:hp("5%")}]} >
                    <Text style={[styles.Txt, {color:white, marginTop:0}]} >FIND JOBS</Text>
                </TouchableOpacity>
            </View>

           
            
            {/* <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Norway Concrete Pump </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={onPress} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View> */}
        </>
    )
}


function Jop_InProcess({isCompany, ViewProfile, AlertPress, ModalPress}) {
    return(
        <>
            <View style={[styles.First, {flexDirection:"column", justifyContent:"center", height:hp("25%")}]} >
                <Text style={[styles.Txt, {fontSize:hp("2.3%"), lineHeight:hp("2.4%"), width:"50%", textAlign:"center"}]} >
                    Job is in Process
                </Text>

                <TouchableOpacity style={[styles.btn,{marginTop:hp("1%"), flexDirection:"row", justifyContent:"space-evenly"}]} >
                    <FontAwesome name="phone" color={white} size={hp("3%")} />
                    <Text style={[styles.Txt, {color:white, marginTop:0}]} >+1 (456) 4567</Text>
                </TouchableOpacity>
                {isCompany
                    &&
                    <View style={styles.Btn_Container} >
                        <TouchableOpacity onPress={AlertPress} style={[styles.btn,{marginTop:hp("1%"), height:hp("5%"), minWidth:"35%",maxWidth:"40%", backgroundColor:"#86AA0C"}]} >
                            <Text style={[styles.Txt, {color:white, marginTop:0}]} >Complete Job</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ModalPress} style={[styles.btn,{marginTop:hp("1%"), height:hp("5%"), width:"35%", backgroundColor:"#979797"}]} >
                            <Text style={[styles.Txt, {color:white, marginTop:0}]} >Cancel Job</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
            
            <View style={[styles.First, {flexDirection:"column",justifyContent:"center", padding:hp("1.25%"), height:hp("18%")}]} >
                <Text style={[styles.DesTxt, {fontFamily:regular}]} > Jack &amd; Jack Company </Text>
                <Text style={styles.DesTxt} adjustsFontSizeToFit={true} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                </Text>
                <TouchableOpacity onPress={ViewProfile} style={{ alignItems:"center", justifyContent:"center", flexDirection:"row", margin:hp("3%") }} >
                    <Text style={[styles.Txt, {fontSize:hp("1.5%"), color:"#FF4040", borderBottomColor:"#FF4040",marginTop:0}]} >
                        View Profile
                    </Text>
                    <AntDesign name="arrowright" color={"#FF4040"} size={hp("2%")} />
                </TouchableOpacity>
            </View>
        </>
    )
}

////////////////////////// JOB IN PROCESS ////////////////////////


function mapStateToProps(state) {
    console.log(state.appReducer)
    return{
        ScreenType: state.appReducer.ScreenType,
        userType: state.authReducer.user.type,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Find_Job);

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


// {
//     this.props.ScreenType=="apply"
//     &&
//     <>
//     <View style={[styles.First]} >
//         <View style={[styles.miniContainer,{borderRightWidth:0}]} >
//             <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'),color: primary}]} >10</Text>
//             <Text style={[styles.Txt,{ fontFamily: regular, color: primary}]} >Required Points</Text>
//         </View>
//         <View style={styles.miniContainer} >
//             <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'), }]} >80</Text>
//             <Text style={[styles.Txt,{fontSize:hp('1.75%'), fontFamily: regular}]} >Available Points</Text>
//         </View>
//         <Ionicons onPress={()=>Alert.alert("Points Information", "Points are required to apply on the jobs. The number of points specified as required points will be deducted from your account when you apply.")} name="information-circle" size={24} color={black} style={{position:'absolute', top:hp('1%'), left: hp('1%')}} />
//     </View>
//     <View style={[styles.First, { borderBottomWidth:hp("0.2%"), flexDirection:'column', justifyContent: 'space-evenly'}]} >
//         <Text style={[styles.txt,{ fontFamily: regular}]}>Bid Range</Text>
//         <Text style={[styles.txt,{ fontFamily: bold, fontSize: hp('3%')}]}>$1200 - $1600</Text>
//         {/* <View style={[styles.miniContainer,{borderRightWidth:0}]} >
//             <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'),color: primary}]} >10</Text>
//             <Text style={[styles.Txt,{ fontFamily: regular, color: primary}]} >Required Points</Text>
//         </View>
//         <View style={styles.miniContainer} >
//             <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp('2.5%'), }]} >80</Text>
//             <Text style={[styles.Txt,{fontSize:hp('1.75%'), fontFamily: regular}]} >Available Points</Text>
//         </View> */}
//     </View>
//     <View style={{backgroundColor:'#DBDBDB', padding: hp('3%')}}>
//         <Text style={{fontFamily: regular, fontSize: hp('2.25%'), textAlign:'center'}}>Write a Proposal</Text>
//         <TextInput
//             style={{
//                 height:'auto',
//                 minHeight: hp('25%'),
//                 backgroundColor:white,
//                 borderRadius: hp('1%'),
//                 marginTop: hp('2%'),
//                 padding:hp('2%'),
//             }}
//             multiline
//             placeholder={"Description"}
//         />
//         <View 
//             style={{
//                 backgroundColor:white,
//                 borderRadius: hp('1%'),
//                 marginTop: hp('2%'),
//                 flex:1,
//                 flexDirection:'row',
//                 paddingHorizontal:hp('2%'),
//                 padding:hp('1%'),
//                 justifyContent:'space-between',
//                 alignItems:'center'
//             }}
//         >
//             <Text style={{fontFamily:regular, fontSize: hp('2%')}}>Bid Amount</Text>
//             <View style={{flexDirection:'row', alignItems:'center'}}>
//                 <Text style={{fontFamily:bold, fontSize: hp('2.25%')}}>$</Text>
//                 <TextInput
//                     style={{
//                         backgroundColor:'#DBDBDB',
//                         height:hp('6%'),
//                         borderRadius:hp('1%'),
//                         fontSize:hp('2%'),
//                         paddingHorizontal:hp('2%'),
//                         marginLeft:hp('1%'),
//                     }}
//                     placeholder="000"
//                 />
//             </View>
//         </View>
//         <Button
//             style={{width:'50%', alignSelf: 'center', marginTop: hp('2.5%')}}
//             color={primary}
//             textColor={white}
//             text={"Send Proposal"}
//             onPress={()=>this.setState({confirmModal: true})}
//         />
//     </View>
//     </>
// }