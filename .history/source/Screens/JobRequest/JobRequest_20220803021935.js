import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Animated,
    RefreshControl
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { ScreenTypeChange } from './../../Redux/Action/App_Action';
// import Applied_Section from '../MyJob/MyJobsSection';
import Recieved_Section from '../MyJob/Recieved_Section';
import { ReceivedJobs } from '../../ScreenComponent/MyJobsComponent/MyJob_Component';
import { bold, semiBold } from '../../assets/fonts';
import { background, primary } from '../../assets/colors';
import { loadMyJobs } from '../../Redux/Action/JobsAction';


class JobRequest extends Component{

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
        }
    }
    componentDidMount(){
    }

    onCardPress = (job) => {
        // this.props._ScreenType("request")
        this.props.navigation.navigate('JobRequestDetails',{job})
    }
    requests1 = [
        {
            job_detail: {title:"title",date:"date",time:"time"},
            pump: {name:"name",user:{name:"name"}},
            date: "12/12/2019",
            status: "Pending",

        }
    ]
    renderJobRequests = () => {
        const {requests} = this.props;
        return(
            <FlatList 
                data={this.requests1}
                renderItem={({item})=>
                    <ReceivedJobs
                        fromJob={item.job_detail.title}
                        Heading={item.pump.name}
                        Date={item.job_detail.date+" "+item.job_detail.time}
                        Person={item.pump.user.name}
                        // Decline={()=> alert("Declined")}
                        // Offer={()=> alert("Offered")}
                        // onPress={()=>this.props.navigation.navigate('Profile',{name: "Kevin Pump Co."})}
                        onPress={() => this.onCardPress(item)}
                    />
                }
            />
           
        )
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.loadJobs();
        this.setState({refreshing: false});
    }
    render(){
        const {refreshing} = this.state;
         return(
            <>
                <AppHeader 
                    Heading={"REQUESTS"}
                    notification
                    borderRadius
                />
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
                    {this.renderJobRequests()}
                    <View style={{height:hp("5%")}} />
                </ScrollView>
            </>
         );
     }
 }

function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text)),
        loadJobs: ()=>dispatch(loadMyJobs())
    }
}

const mapStateToProps = state => {
    return{
        requests: state.jobReducer.requests
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobRequest);

 const styles = StyleSheet.create({
    main:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor:background,
        padding:hp("1.5%"),
        paddingBottom:0,
        zIndex:0
    },
    ModalContainer:{
        width:"100%",
        height:hp("20%"),
        bottom:hp("30%"),
        backgroundColor:"#505050",
        padding:hp("2%"),
        // zIndex:1
    },
    Heading:{
        fontSize:hp("2.5%"),
        fontFamily:bold,
        color:"black",
        marginLeft:hp('2%'),
        marginVertical:hp('1%'),
    },
    ////////////////////////////////////////////
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
        fontSize:hp("1.9%"),
        fontFamily:semiBold,
        // lineHeight:hp("1.7%"),
        color:"#FFFFFF",
        letterSpacing:2,
     },
 });