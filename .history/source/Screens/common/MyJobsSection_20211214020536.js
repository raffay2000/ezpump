import React, { Component } from 'react';
import { Secondary } from '../../ScreenComponent/color';
import { ReceivedJobs, My_Job_Component} from '../../ScreenComponent/MyJobsComponent/MyJob_Component';
import { connect, useDispatch } from 'react-redux';
import { ScreenTypeChange } from '../../Redux/Action/App_Action';

const MyJobsSection = ({filter, navigation}) => {

    const dispatch = useDispatch();

    const navigate = (name, type="") => () => {
        dispatch(ScreenTypeChange(type))
        navigation.navigate(name);
    }

    if(filter == "Applied"){
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

    }else if(filter == "In Process"){
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
                    status={"In Process"}
                />
            </>
        )
    }else if(filter == "Completed") {
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
    }else if(filter == "Pending") {
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

export default connect(null, mapDispatchToProps)(MyJobsSection);