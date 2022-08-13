import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import AntDesign from "react-native-vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobList from './JobList';
import JobOn_Map from './JobOn_Map';
import { TabView, SceneMap } from "react-native-tab-view";
import { useNavigation } from '@react-navigation/native';
import { primary, white } from '../../../assets/colors';
import { regular } from '../../../assets/fonts';
import Modal from '../../../ScreenComponent/common/Modal';
import JobsFilter from '../../../ScreenComponent/JobsFilter';
import FilterModal from '../../../ScreenComponent/FilterModal';
import { distanceFilterData } from '../../../utils/RawData';
import { connect } from 'react-redux';
import { changeJobsFilter } from '../../../Redux/Action/JobAction';

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state={
            filterType: '',
            filterVisible: false,
        }
        this.jobsListRef = React.createRef()
    }
    
    onFilterPress = (filterText) => {
        return this.jobsListRef.current.makeALert
        this.setState({filterVisible: true, filterType: filterText})
    }

    onFilterSubmitPress = (val) => {
        const {filterType} = this.state;
        const {jobsFilter} = this.props;
        if(filterType=="Distance"){
            jobsFilter.distance = val;
        }else if(filterType == "Pump Type"){
            jobsFilter.pumpType = val;
        }else{
            jobsFilter.jobType = val;
        }
        this.props.changeFilter(jobsFilter);
        this.setState({filterVisible: false})
    }
    renderFilterValue = () => {
        const {filterType} = this.state;
        const {jobsFilter} = this.props;
        if(filterType=="Distance"){
            return jobsFilter.distance
        }else if(filterType == "Pump Type"){
            return jobsFilter.pumpType
        }else{
            return jobsFilter.jobType
        }
    }
    renderFilterData = () => {
        const {filterType} = this.state;
        const {jobTypes, pumpTypes} = this.props;
        if(filterType=="Distance"){
            return distanceFilterData
        }else if(filterType == "Pump Type"){
            return pumpTypes
        }else{
            return jobTypes
        }
    }
    render(){
        const {filterType, filterVisible} = this.state;
        const { jobsFilter } = this.props;
        return(
            <>
            <AppHeader 
                Heading={"JOBS"}
                borderRadius
                notification
            />
            <View style={styles.main} >
                <JobList 
                    navigation={this.props.navigation}
                    ref={this.jobsListRef}    
                />
                <View style={styles.FilterContainer} >
                    <JobsFilter
                        FilterName="Distance"
                        Type={jobsFilter.distance || "Any"}
                        onPress={this.onFilterPress}
                    />
                    <JobsFilter
                        FilterName="Pump Type"
                        Type={jobsFilter.pumpType || "Any"}
                        OtherStyle={{borderLeftColor:"white", borderLeftWidth:1, borderRightColor:"white", borderRightWidth:1  }}
                        onPress={this.onFilterPress}
                    />
                    <JobsFilter
                        FilterName="Job Type"
                        Type={jobsFilter.jobType || "Any"}
                        onPress={this.onFilterPress}
                    />
                </View>
                <FilterModal
                    heading={filterType}
                    isVisible={filterVisible}
                    onBackPress={()=>this.setState({filterVisible: false})}
                    value={this.renderFilterValue()}
                    data={this.renderFilterData()}
                    onSubmit={this.onFilterSubmitPress}
                />
            </View>
            </>
        );
    }
}

// const Job_List = () => {
//     const navigation = useNavigation();
//     return(
//         <View style={{padding:hp("1.5%"), paddingTop:0, paddingBottom:0}} >
//             <JobList navigation={navigation} />
//         </View>
//     )
// }
// const Job_OnMap = () => (
//     <JobOn_Map />
// );

const mapStateToProps = state => {
    return{
        jobTypes: state.appReducer.jobTypes,
        pumpTypes: state.appReducer.pumpTypes,

        jobsFilter: state.jobReducer.jobsFilter,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        changeFilter: (filter)=>dispatch(changeJobsFilter(filter))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Jobs);

const styles = StyleSheet.create({
   
    main:{
        flex:1,
        backgroundColor:white,
        justifyContent:"space-between"
    },
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
    
    FilterContainer:{
        // position:"absolute",
        // bottom:hp("-1%"),
        width:"100%",
        height:hp("7%"),
        backgroundColor:"#505050",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
 });