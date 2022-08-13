import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import JobsFilter from '../../../ScreenComponent/JobsFilter';
import JobList from './JobList';
import { primary, white } from '../../../assets/colors';
import FilterModal from '../../../ScreenComponent/FilterModal';
import { distanceFilterData } from '../../../utils/RawData';
import { connect } from 'react-redux';
// import { changeJobsFilter } from '../../../Redux/Action/JobAction';
// import { loadPumps } from '../../../Redux/Action/PumpAction';

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state={
            filterType: '',
            filterVisible: false,
            filterValue: '',
        }
        this.jobsListRef = React.createRef()
    }
    componentDidMount(){
        // this.props.loadPumps();
    }
    
    onFilterPress = (filterText) => {
        const {jobsFilter} = this.props;
        var filterValue;
        if(filterText=="Distance"){
            filterValue = jobsFilter.distance
            // this.setState({filterValue: jobsFilter.distance })
        }else if(filterText=="Pump Type"){
            filterValue = jobsFilter.pumpType
        }else{
            filterValue = jobsFilter.jobType
        }
        this.setState({filterValue, filterType: filterText, filterVisible: true })
    }

    onFilterSubmitPress = (val) => {
        this.setState({filterVisible: false});
        if(!val.id) return;
        const {filterType} = this.state;
        const {jobsFilter} = this.props;
        if(filterType=="Distance"){
            if(val.id == jobsFilter.distance.id) return;
            jobsFilter.distance = val;
        }else if(filterType == "Pump Type"){
            if(val.id == jobsFilter.pumpType.id) return
            jobsFilter.pumpType = val;
        }else{
            if(val.id == jobsFilter.jobType.id) return
            jobsFilter.jobType = val;
        }

        this.props.changeFilter(jobsFilter);
        this.jobsListRef.current()
    }
    // renderFilterValue = () => {
    //     const {filterType} = this.state;
    //     const {jobsFilter} = this.props;
    //     if(filterType=="Distance"){
    //         console.log('mai value hun',filterType,jobsFilter.distance )
    //         return jobsFilter.distance
    //     }else if(filterType == "Pump Type"){
    //         console.log('mai value hun',filterType,jobsFilter.pumpType )
    //         return jobsFilter.pumpType
    //     }else{
    //         console.log('mai value hun',filterType, jobsFilter.jobType )
    //         return jobsFilter.jobType
    //     }
    // }
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
                    jobsListRef ={this.jobsListRef}    
                />
                <View style={styles.FilterContainer} >
                    <JobsFilter
                        FilterName="Distance"
                        Type={jobsFilter.distance.type_name || "Any"}
                        onPress={this.onFilterPress}
                    />
                    <JobsFilter
                        FilterName="Pump Type"
                        Type={jobsFilter.pumpType.type_name || "Any"}
                        OtherStyle={{borderLeftColor:"white", borderLeftWidth:1, borderRightColor:"white", borderRightWidth:1  }}
                        onPress={this.onFilterPress}
                    />
                    <JobsFilter
                        FilterName="Job Type"
                        Type={jobsFilter.jobType.type_name || "Any"}
                        onPress={this.onFilterPress}
                    />
                </View>
                <FilterModal
                    heading={filterType}
                    isVisible={filterVisible}
                    onBackPress={()=>this.setState({filterVisible: false})}
                    // value={this.renderFilterValue()}
                    value={this.state.filterValue}
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
        // changeFilter: (filter)=>dispatch(changeJobsFilter(filter)),
        // loadPumps: ()=>dispatch(loadPumps()) 
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