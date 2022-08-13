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

class Applied_Section extends Component{


    navigate = (name, type="") => () => {
        this.props._ScreenType(type)
        this.props.navigation.navigate(name);
    }

    renderSection_Applied = () => {
        if(this.props.filter == "Applied"){
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

        }else if(this.props.filter == "In Process"){
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
        }else if(this.props.filter == "Completed") {
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
        }else if(this.props.filter == "Pending") {
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

    render() {
        return (
             this.renderSection_Applied()
        );
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text))
    }
}
export default connect(null, mapDispatchToProps)(Applied_Section);