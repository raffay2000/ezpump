import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { Primary, ScreenBackGround, Secondary, White } from '../../ScreenComponent/color';
import { ReceivedJobs, My_Job_Component} from '../../ScreenComponent/MyJobsComponent/MyJob_Component';
import Job_Process from "../../ScreenComponent/MyJobsComponent/Job_Process_Component";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bold, Regular, SemiBold } from '../../ScreenComponent/Fonts';
import { connect } from 'react-redux';
import { ScreenTypeChange } from '../../Redux/Action/App_Action';
import { TabView, SceneMap } from "react-native-tab-view";
import Applied_Section from './Applied_Section';
import Recieved_Section from './Recieved_Section';


class My_Jobs extends Component{

    constructor(props){
        super(props);
        this.state={
            Show_Modal:false,
            filter:"",
            FilterToggle:false,
            userType:true,
            // index: 0,
            // routes: [
            //     { key: 'AppliedJob', title: 'Applied Job' },
            //     { key: 'RecievedJob', title: 'Recieved Job' },
            // ],
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('Type',(err,data)=>{
            if(data == "Company"){
                // this.setState({userType:true, filter:"Received"})
                this.setState({userType:true})
            }else{
                // this.setState({userType:false, filter:"Applied"})
                this.setState({userType:false})
            }
        })
        console.log(this.state.filter)
    }

    navigate = (name, type="") => () => {
        this.props._ScreenType(type)
        this.props.navigation.navigate(name);
    }

    getHeading= (name) => {
        // add condition for heading as Company type
       if(this.state.userType){
            return name
       }
       else{
           // This is the Last Condition before 23rd Oct
            if(!this.state.filter){
                return name+" Jobs"
            }
            else if(this.state.filter == "Received"){
                return  "Received Job Requests"
            }
            else {
                return this.state.filter+" Jobs"
            }
            return
       }
    }

    Applied_Job = () =>  {
            return(
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({FilterToggle:false})} disabled={!this.state.FilterToggle} style={styles.main} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={styles.Heading}>{this.getHeading("Applied")}</Text>
                        {/* { 
                            this.renderSection_Applied()
                        } */}
                        <Applied_Section filter={this.state.filter} navigation={this.props.navigation} /> 
                        <View style={{height:hp("5%")}} />

                    </ScrollView>
                </TouchableOpacity>
            )
    }

    // Recieved_Job = () => {
    //     return(
    //         <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({FilterToggle:false})} disabled={!this.state.FilterToggle} style={styles.main} >
    //             <ScrollView showsVerticalScrollIndicator={false} >
    //                 <Text style={styles.Heading}>{this.getHeading(this.state.userType?this.state.filter:"Received")}</Text>
    //                 {/* {
    //                     this.renderSection_Recieved()} */}
    //                 <Recieved_Section filter={this.state.filter} navigation={this.props.navigation} />
    //                 <View style={{height:hp("5%")}} />

    //             </ScrollView>
    //         </TouchableOpacity>
    //     )
    // }

    renderSection_Applied = () => {
        if(this.state.filter == "Applied"){
            return(
                <>
                    <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("FindJob", "approved")}
                        IsService={true}
                        statusColor={"#86AA0C"}
                        status={"Applied"}
                    />
               </>
            )

        }else if(this.state.filter == "In Process"){
            return(
                <>
                    <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("FindJob", "inprogress")}
                        IsService={true}
                        statusColor={"#818585"}
                        status={"Pending"}
                    />
                </>
            )
        }else if(this.state.filter == "Completed") {
            return(
                <>
                    <My_Job_Component
                        Heading="Northan Concrete Pump"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("FindJob", "completed")}
                        IsService={false}
                        statusColor={"#818585"}
                        status={"View Details"}
                    />
            </>
            )
        }else if(this.state.filter == "Pending") {
            return(
                <>
                    <My_Job_Component
                        Heading="Northan Concrete Pump"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("FindJob", "pending")}
                        IsService={false}
                        statusColor={"#818585"}
                        status={"Pending"}
                    />
            </>
            )
        }
        else{
            return(
                <>  
                   <My_Job_Component
                        Heading="Box Hill North, VIC"
                        Date="Sat, 22, May"
                        Service="Boom service"
                        Person="Richard Davidson"
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        onPress={this.navigate("FindJob", "cancelled")}
                        IsService={true}
                        statusColor={Secondary}
                        status={"Cancelled"}
                    />
                </>
            )
        }
    }

    // renderSection_Recieved = () => {
    //     if(this.state.filter == "Received"){
    //         return(
    //             <>
    //                 <ReceivedJobs
    //                     Heading="Northan Concrete Pump"
    //                     Date="Sat, 22, May"
    //                     Person="Richard Davidson"
    //                     Decline={()=> alert("Declined")}
    //                     Offer={()=> alert("Offered")}
    //                     onPress={()=>this.props.navigation.navigate('Profile',{name: "Kevin Pump Co."})}
    //                 />
    //             </>    
    //         )
    //     }else if(this.state.filter == "In Process"){
    //         return(
    //             <>
    //                 <My_Job_Component
    //                     Heading="Box Hill North, VIC"
    //                     Date="Sat, 22, May"
    //                     Service="Boom service"
    //                     Person="Richard Davidson"
    //                     Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
    //                     onPress={this.navigate("FindJob", "inprogress")}
    //                     IsService={true}
    //                     statusColor={"#818585"}
    //                     status={"Pending"}
    //                 />
    //             </>
    //         )
    //     }else if(this.state.filter == "Completed") {
    //         return(
    //             <>
    //                 <My_Job_Component
    //                     Heading="Northan Concrete Pump"
    //                     Date="Sat, 22, May"
    //                     Service="Boom service"
    //                     Person="Richard Davidson"
    //                     Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
    //                     onPress={this.navigate("FindJob", "completed")}
    //                     IsService={false}
    //                     statusColor={"#818585"}
    //                     status={"View Details"}
    //                 />
    //         </>
    //         )
    //     }else if(this.state.filter == "Pending") {
    //         return(
    //             <>
    //                 <My_Job_Component
    //                     Heading="Northan Concrete Pump"
    //                     Date="Sat, 22, May"
    //                     Service="Boom service"
    //                     Person="Richard Davidson"
    //                     Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
    //                     onPress={this.navigate("FindJob", "pending")}
    //                     IsService={false}
    //                     statusColor={"#818585"}
    //                     status={"Pending"}
    //                 />
    //         </>
    //         )
    //     }
    //     else{
    //         return(
    //             <>  
    //                <My_Job_Component
    //                     Heading="Box Hill North, VIC"
    //                     Date="Sat, 22, May"
    //                     Service="Boom service"
    //                     Person="Richard Davidson"
    //                     Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
    //                     onPress={this.navigate("FindJob", "cancelled")}
    //                     IsService={true}
    //                     statusColor={Secondary}
    //                     status={"Cancelled"}
    //                 />
    //             </>
    //         )
    //     }
    // }

    // _handleIndexChange = (index) => this.setState({ index });

    // _renderTabBar = (props) => {
    //     const inputRange = props.navigationState.routes.map((x, i) => i);

    //     return (
    //         <View style={styles.Top}>
    //             {props.navigationState.routes.map((route, i) => {
    //             const opacity = props.position.interpolate({
    //                 inputRange,
    //                 outputRange: inputRange.map((inputIndex) =>
    //                 inputIndex === i ? 1 : 0.5
    //                 ),
    //             });

    //         return (
    //                 <TouchableOpacity
    //                     style={styles.tabItem}
    //                     onPress={() => this.setState({ index: i })}>
    //                         <Animated.Text style={ [styles.TopTxt, {opacity}]}>{route.title}</Animated.Text>
    //                 </TouchableOpacity>
    //             );
    //         })}
    //     </View>
    //     );
    // };

    // _renderScene = SceneMap({
    //     AppliedJob: this.Applied_Job,
    //     RecievedJob: this.Recieved_Job,
    // });


     render(){
         return(
            <>
                <AppHeader 
                    Heading={"MY JOBS"}
                    userType={this.state.userType}
                    // BorRadius={true}
                    IsFilter={true}
                    style={{zIndex:100}}
                    Check_Filter={this.state.FilterToggle}
                    onFilterPress={(text)=>this.setState({filter:text, FilterToggle:false})}
                    Close={()=> this.setState({FilterToggle: !this.state.FilterToggle})}
                />
                {this.Applied_Job()}
                {/* {
                    /// if UserType True it's means Company logged In
                    this.state.userType?
                        this.Recieved_Job()
                        :
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                            onSwipeStart={()=>this.setState({filter: "Received"})}
                        />
                } */}

                {/* <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({FilterToggle:false})} disabled={!this.state.FilterToggle} style={styles.main} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={styles.Heading}>{this.state.filter=="Received" ?  "Received Job Requests" : this.state.filter+" Jobs"}</Text>
                        {this.renderSection()}
                        <View style={{height:hp("5%")}} />

                    </ScrollView>
                </TouchableOpacity> */}

               
            </>
         );
     }
 }

//  function Applied_Job({Onpress}) {
//      return(
//         <My_Job_Component
//             Heading="Box Hill North, VIC"
//             Date="Sat, 22, May"
//             Service="Boom service"
//             Person="Richard Davidson"
//             Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
//             onPress={Onpress}
//             IsService={true}
//             statusColor={"#86AA0C"}
//             status={"Applied"}
//         />
//      )
//  }

//  function Recieved_Job({Onpress}) {
//      return(
//         <ReceivedJobs
//             Heading="Northan Concrete Pump"
//             Date="Sat, 22, May"
//             Person="Richard Davidson"
//             Decline={()=> alert("Declined")}
//             Offer={()=> alert("Offered")}
//             onPress={Onpress}
//         />
//      )
//  }

 function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text))
    }
}
export default connect(null, mapDispatchToProps)(My_Jobs);

 const styles = StyleSheet.create({
    main:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor:ScreenBackGround,
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
        fontFamily:Bold,
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
        backgroundColor:Primary,
        borderBottomRightRadius:hp("2%"),
        borderBottomLeftRadius:hp("2%"),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
     },
     TopTxt:{
        flexDirection: 'row',
        fontSize:hp("1.9%"),
        fontFamily:SemiBold,
        // lineHeight:hp("1.7%"),
        color:"#FFFFFF",
        letterSpacing:2,
     },
 });