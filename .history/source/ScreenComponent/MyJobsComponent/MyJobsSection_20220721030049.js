import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ReceivedJobs, My_Job_Component} from './MyJob_Component';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ScreenTypeChange } from '../../Redux/Action/App_Action';
import { secondary } from '../../assets/colors';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';

const MyJobsSection = ({filter, navigation}) => {

    const dispatch = useDispatch();

    const pendingJobs = useSelector(state => state.jobReducer.pending);
    const cancelledJobs = useSelector(state => state.jobReducer.cancelled);
    const completedJobs = useSelector(state => state.jobReducer.completed);
    const inprocessJobs = useSelector(state => state.jobReducer.inprocess);
    // const appliedJobs = useSelector(state => state.jobReducer.applied);
    appliedJobs = [
        {
            job_detail:{
                job_id: 1,
                title: "Job Title",
                date: "Job Date",   
                time: "Job Time",
                price_from:"55",
                price_to:"25",
            },
            job_type:{
                type_name:"pending",
            },
            pump_type:{
                type_name:"Pump Type",
            }        
    
    },
   
    ]
    const rejectedJobs = useSelector(state => state.jobReducer.rejected);

    const navigate = (name, type="", job) => () => {
        dispatch(ScreenTypeChange(type))
        navigation.navigate('JobDetails', {job});
    }

    if(filter == "Applied"){
        if(this.appliedJobs.length>0){
            return(
                <FlatList
                    data={this.appliedJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                        <My_Job_Component
                            heading={item.job_detail.title}
                            date={item.job_detail.date+" "+item.job_detail.time}
                            service={item.job_type.type_name}
                            pumpType={item.pump_type.type_name}
                            price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                            onPress={navigate("JobDetails", "applied", item)}
                            statusColor={"#818585"}
                            status={"Applied"}
                        />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"You have not applied to any job yet"} />
        }

    }else if(filter == "In Process"){
        if(inprocessJobs.length>0){
            return(
                <FlatList
                    data={inprocessJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                        <My_Job_Component
                            // heading={item.title}
                            heading={item.job_detail.title}
                            date={item.job_detail.date+" "+item.job_detail.time}
                            service={item.job_type.type_name}
                            pumpType={item.pump_type.type_name}
                            price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                            onPress={navigate("JobDetails", "inprogress", item)}
                            statusColor={"#818585"}
                            status={"In Process"}
                        />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"No Jobs in Process"} />
        }
    }else if(filter == "Completed") {
        if(completedJobs.length > 0){
            return(
                <FlatList
                    data={completedJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                        <My_Job_Component
                            heading={item.job_detail.title}
                            date={item.job_detail.date+" "+item.job_detail.time}
                            service={item.job_type.type_name}
                            pumpType={item.pump_type.type_name}
                            price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                            onPress={navigate("JobDetails", "completed", item)}
                            statusColor={"#818585"}
                            status={"View Details"}
                            // distance={'40 Km'}
                        />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"No Completed Jobs Yet"} />
        }
    }else if(filter == "Pending") {
        if(pendingJobs.length > 0){
            return(
                <FlatList
                    data={pendingJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                        <My_Job_Component
                            heading={item.job_detail.title}
                            date={item.job_detail.date+" "+item.job_detail.time}
                            service={item.job_type.type_name}
                            pumpType={item.pump_type.type_name}
                            price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                            onPress={navigate("JobDetails", "pending", item)}
                            statusColor={"#86AA0C"}
                            status={"Pending"}
                            // distance={'40 Km'}
                        />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"No Pending Jobs Yet"} />
        }


    }
    else if(filter == "Cancelled"){
        if(cancelledJobs.length > 0){
            return(
                <FlatList
                    data={cancelledJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                    <My_Job_Component
                        heading={item.job_detail.title}
                        date={item.job_detail.date+" "+item.job_detail.time}
                        service={item.job_type.type_name}
                        pumpType={item.pump_type.type_name}
                        price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                        onPress={navigate("JobDetails", "cancelled", item)}
                        statusColor={secondary}
                        status={"Cancelled"}
                    />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"No Cancelled Jobs Yet"} />
        }
    }
    else if(filter == "Rejected"){
        if(rejectedJobs.length > 0){
            return(
                <FlatList
                    data={rejectedJobs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>
                    <My_Job_Component
                        heading={item.job_detail.title}
                        date={item.job_detail.date+" "+item.job_detail.time}
                        service={item.job_type.type_name}
                        pumpType={item.pump_type.type_name}
                        price={`$${item.job_detail.price_from}-$${item.job_detail.price_to}`}
                        onPress={navigate("JobDetails", "rejected", item)}
                        statusColor={secondary}
                        status={"Rejected"}
                    />
                    }
                />
            )
        }else{
            return <ErrorMessage text={"No Rejected Jobs Yet"} />
        }
    }
}

export default MyJobsSection;