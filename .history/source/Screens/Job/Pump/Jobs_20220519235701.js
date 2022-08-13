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

 export default class Jobs extends Component{

    constructor(props){
        super(props);
        this.state={
            filterType: '',
            filterVisible: false,
            filterValue: '',
        }
    }
    onFilterPress = (filterText) => {
        return alert('ok')
        this.setState({filterVisible: true, filterType: filterText})
    }
    render(){
        const {filterType, filterValue, filterVisible} = this.state;

        return(
           <>
                <AppHeader 
                    Heading={"JOBS"}
                    borderRadius
                    notification
                />

                <View style={styles.main} >
                    <JobList navigation={this.props.navigation} />
                    <View style={styles.FilterContainer} >
                        <JobsFilter
                            FilterName="Distance"
                            Type="Any"
                            onPress={()=>this.onFilterPress}
                        />
                        <JobsFilter
                            FilterName="Pump Type"
                            Type="Any"
                            OtherStyle={{borderLeftColor:"white", borderLeftWidth:1, borderRightColor:"white", borderRightWidth:1  }}
                            onPress={()=>this.onFilterPress}
                        />
                        <JobsFilter
                            FilterName="Job Type"
                            Type="Any"
                            onPress={()=>this.onFilterPress}
                        />
                    </View>
                    <FilterModal
                        heading={filterType}
                        isVisible={filterVisible}
                        value={filterValue}
                        data={[]}
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