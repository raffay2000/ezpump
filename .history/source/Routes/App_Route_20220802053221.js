import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';

import PumpIcon from '../assets/images/pump.svg';
import PumpIconRed from '../assets/images/pumpiconred.svg';

import Jobs from "../Screens/Job/Pump/Jobs";
import MyJobs from "../Screens/MyJob/MyJobs";
import App_Pumps from "../Screens/Pumps/Pumps";
import Create_Job from "../Screens/JobCreate/Create_Job";
import Account_Profile from "../Screens/Account/Account";
import Company_JobApproval from "../Screens/Job/Company/JobApproval";
import Setting from "../Screens/Setting/Setting";
import PaymentForm from "../Screens/PaymentMethod/PaymentForm";
import PaymentMethod from "../Screens/PaymentMethod/PaymentMethod";
import JobCompleted from "../Screens/Job/Company/JobCompleted";
import CompanyReview from "../Screens/Job/Company/Company_Review";
import Job_Process from "../Screens/MyJob/Job_Process";
import AccountSetting from "../Screens/Setting/AccountSetting";
import ChangePassword from "../Screens/Setting/Password_Change";
import SelectPay_Method from "../Screens/Setting/SelectPay_Method";
import PrivacyPolicy from "../Screens/Setting/PrivacyPolicy";
import Terms_Condition from "../Screens/Setting/Terms_Condition";


import Icon from "react-native-vector-icons/FontAwesome";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import MatCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../Screens/common/Profile';
import Edit_Account from "../Screens/Setting/Edit_Account";
import BuyPoints from '../Screens/Setting/BuyPoints';
import JobRequest from '../Screens/JobRequest/JobRequest';
import Notifications from '../Screens/common/Notification';
import JobDetails from '../Screens/common/JobDetails';
import ApplyJob from '../Screens/Job/Pump/ApplyJob';
import JobRequestDetails from '../Screens/JobRequest/JobRequestDetails';
import { semiBold } from '../assets/fonts';
import { primary, secondary, white } from '../assets/colors';
import { getJobAndPumpTypes } from '../Redux/Action/App_Action';
import AddEditPump from '../Screens/Pumps/AddEditPump';
import Map_location from '../Screens/JobCreate/Map_location';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator(props) {
    // console.log('props', JSON.stringify(props))
    // const {type} = props.route.params;
    // const type = 'Pump';

    const dispatch = useDispatch();

    const type = useSelector(state=> state.authReducer.user.user_type)
    console.log('type', type);

    // useEffect(()=>{
    //     dispatch(getJobAndPumpTypes());
    // },[])

    return(
        <Tab.Navigator 
            initialRouteName="Jobs" 
            screenOptions={{
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                    // tabBarInactiveBackgroundColor:"red",
                    tabBarActiveTintColor:secondary,
                    tabBarInactiveTintColor:white,
                    tabBarLabelStyle:{marginBottom:hp("2%") , fontFamily:semiBold , fontSize:hp("1.5%"), lineHeight:hp("1.6%"), letterSpacing:1, marginTop:hp("2%") },
                    tabBarStyle:{
                        width:'100%',
                        height:hp("9%"),
                        // borderTopRightRadius:hp("1.5%"),
                        // borderTopLeftRadius:hp("1.5%"),  
                        backgroundColor:primary,
                        shadowColor:primary,
                        shadowOffset:{width:0 , height: -3},
                        shadowRadius:23,
                        elevation:23,
                    }
                }}
            backBehavior
        >
            {
                type === "PUMP" 
                    &&
                    <Tab.Screen initialParams={{type}} name="Jobs" component={JobsStack}

                        options={{
                                tabBarIcon:({focused}) => (
                                        focused ?
                                        <Icon name="send" size={hp("2.7%")} color={secondary} style={{ marginBottom:'-20%' }} />
                                        :
                                        <Icon name="send" size={hp("2.7%")} color={white} style={{ marginBottom:'-20%' }} />
                                        
                                    )   
                            }} 
                    />
            }

            
            <Tab.Screen name="My Jobs" component={MyJobsStack}  
                options={{
                        tabBarIcon:({focused}) => (
                            
                            focused ?
                            <MatIcon name="work" size={hp("3.2%")} color={secondary} style={{ marginBottom:'-20%' }} />
                            :
                            <MatIcon name="work" size={hp("3.2%")} color={white} style={{ marginBottom:'-20%' }} />
                            )
                    }} 
                />

            {
                type == "PUMP" 
                    &&
                    <Tab.Screen name="Pumps" component={PumpsStack} 
                        options={{
                            tabBarIcon:({focused}) => (
                                
                                focused ?
                                <PumpIconRed width={hp('5%')} height={hp('5%')} style={{marginTop:hp('2.5%')}}/>
                                :
                                // <FontIcon name="gas-pump" size={hp("3%")} color={white} style={{ marginBottom:'-20%' }} />
                                <PumpIcon width={hp('5%')} height={hp('5%')} style={{marginTop:hp('2.5%')}}/>
                                )
                        }}  
                    />
            }
                    
            {type=="COMPANY"
                &&
                <>
                <Tab.Screen initialParams={{type}} name="Job Requests" component={JobRequestsStack}
                    options={{
                            tabBarIcon:({focused}) => (
                                    focused ?
                                    <MatCommIcon name="clipboard-plus" size={hp("3.2%")} color={secondary} style={{ marginBottom:'-20%' }} />
                                    :
                                    <MatCommIcon name="clipboard-plus" size={hp("3.2%")} color={white} style={{ marginBottom:'-20%' }} />
                                    
                                )   
                        }} 
                />
                <Tab.Screen name="Create Job" component={CreateJobStack} 
                    options={{
                        tabBarIcon:({focused}) => (

                                focused ?
                                <IonIcon name="create" size={hp("3.3%")} color={secondary}  style={{ marginBottom:'-20%' }} />
                                :
                                <IonIcon name="create" size={hp("3.3%")} color={white} style={{ marginBottom:'-20%' }} />
                            )
                    }} 
                />
                </>
            }
            <Tab.Screen name="Account" component={AccountStack} 
                options={{
                    
                    tabBarIcon:({focused}) => (

                            focused ?
                            <IonIcon name="person" size={hp("3.3%")} color={secondary} style={{ marginBottom:'-20%' }} />
                            :
                            <IonIcon name="person" size={hp("3.3%")} color={white} style={{ marginBottom:'-20%' }} />
                        )
                }} 
            />
    </Tab.Navigator>
    )
}

function JobsStack(props) {
    const {type} = props.route.params;
    //findjob2 jugar hai redux se sahi hoga
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="JobsScreen" component={Jobs} />
            {/* <Stack.Screen name="JobDetails" component={JobDetails} /> */}
            <Stack.Screen name="ApplyJob" component={ApplyJob} />
            {/* <Stack.Screen name="FindJob2" component={FindJob} /> */}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    )
}

function MyJobsStack(params) {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="MyJobs" component={MyJobs} />
            <Stack.Screen name="Job_Process" component={Job_Process} />
            <Stack.Screen name="JobDetails" component={JobDetails} />
            <Stack.Screen name="Notifications" component={Notifications} />
            
            {/* <Stack.Screen name="Company_JobApproval" component={Company_JobApproval} /> */}
            {/* <Stack.Screen name="Company_JobApproval2" component={Company_JobApproval} /> */}
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator> 
    )
}

function JobRequestsStack(params) {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="JobRequest" component={JobRequest} />
            <Stack.Screen name="JobRequestDetails" component={JobRequestDetails} />
            {/* <Stack.Screen name="Company_JobApproval" component={Company_JobApproval} /> */}
            {/* <Stack.Screen name="Company_JobApproval2" component={Company_JobApproval} /> */}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator> 
    )
}
function PumpsStack(params) {
        return(
            <Stack.Navigator screenOptions={{headerShown:false}} >
                <Stack.Screen name="App_Pumps" component={App_Pumps} />
                <Stack.Screen name="AddEditPump" component={AddEditPump} />
            </Stack.Navigator>
        )
}

function CreateJobStack(params) {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="Create_Job" component={Create_Job} />
            <Stack.Screen name="Map_location" component={Map_location} />
        </Stack.Navigator>
    )
}

function AccountStack(params) {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="App_Profile" component={Account_Profile} />
        </Stack.Navigator>
    )
}


function AppRoutes({route}) {
    // const {type} =  route.params;
    return(
            <Stack.Navigator screenOptions={{ headerShown:false }} >
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
                {/* <Stack.Screen initialParams={{type}} name="TabNavigator" component={TabNavigator} /> */}
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="BuyPoints" component={BuyPoints} />
                <Stack.Screen name="AccountSetting" component={AccountSetting} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="SelectPay_Method" component={SelectPay_Method} />
                <Stack.Screen name="Edit_Account" component={Edit_Account} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="Terms_Condition" component={Terms_Condition} />
                <Stack.Screen name="PaymentForm" component={PaymentForm} />
                <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
                <Stack.Screen name="JobCompleted" component={JobCompleted} />
                <Stack.Screen name="CompanyReview" component={CompanyReview} />
            </Stack.Navigator>
    );
}

export default AppRoutes;



