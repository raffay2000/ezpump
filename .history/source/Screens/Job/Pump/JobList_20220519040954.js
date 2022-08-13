import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import JobList_Component from '../../../ScreenComponent/Job_Component/JobList_Component';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { ScreenTypeChange } from '../../../Redux/Action/App_Action';

var that;
class JobList extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: false,
            page:1,
            jobs: [],
            isListEnd:false,
            success:false,
            error:false
        }
    }
    componentDidMount(){
        that = this;
    }
    loadJobs = () => {
        const {loading, page, jobs, isListEnd} = this.state;
        if(!loading && !isListEnd){
            that.setState({ loading: true })
            fetchAPI('get', 'get-all-jobs', null, true, {page})
            .then(function (response) {
                if(response.data.success){
                    that.setState({ success: true, error:false })
                }
                else{
                    that.setState({error: true})
                }
                if(response.data.data.length > 0){
                    that.setState({
                        page:page+1,
                        posts:[...posts,...response.data.data],
                        loading:false,
                        error:false,
                        refreshing:false
                    })
                }
                else{
                    that.setState({
                        isListEnd: true,
                        loading: false,
                        error:false,
                        refreshing:false

                    })
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                that.setState({
                    loading:false,
                    isListEnd: true,
                    error:true,
                    refreshing:false
                });
            });
        }
        
    }
    renderFooter(){
        if(this.state.loading){
            return <ActivityIndicator style={{ padding: 20 }} size="large" color={primary} />
        }
        else{
            return <View style={{height:hp('5%')}}/>
        }
    }
    // checkType = async() => {
    //     await AsyncStorage.getItem("Type", (err, data)=> {
    //             if(data === "Company"){
    //                 this.setState({Check_Type: true})
    //                 // alert(this.state.Check_Type)
    //             }   
    //             else{
    //                 this.setState({Check_Type: false});
    //                 // alert(this.state.Check_Type)
    //             }
    //      })
    //  }
 
    // componentDidMount(){
    //     this.checkType()
    // }
    navigate = (name, type="") => () => {
        // if(name == "FindJob"){
            // this.props._ScreenType(type)
            this.props.navigation.navigate("ApplyJob");
        // }else{
        //     this.props.navigation.navigate("Company_JobApproval", {type:"inprogress"})
        // }
    }
    
    

    render() {
        return (
            // <View styles={styles.main} >
                <ScrollView contentContainerStyle={{paddingHorizontal:hp('2%')}} showsVerticalScrollIndicator={false} >

                    <JobList_Component 
                        // isDisabled={this.state.Check_Type}
                        heading={"Box Hill North, VIC"}
                        Date={"Sat, 22, May"}
                        Service={"Boom service"}
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        PostedBy={"Posted by Kevin Concrete Pumping"}
                        Urgent={false}
                        Onpress={this.navigate("JobDetails", "apply")}
                    /> 

                    <JobList_Component 
                        // isDisabled={this.state.Check_Type}
                        heading={"Box Hill North, VIC"}
                        Date={"Sat, 22, May"}
                        Service={"Boom service"}
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        PostedBy={"Posted by Kevin Concrete Pumping"}
                        Urgent={true}
                        Onpress={this.navigate("JobDetails", "apply")}
                    />

                    <JobList_Component 
                        // isDisabled={this.state.Check_Type}
                        heading={"Box Hill North, VIC"}
                        Date={"Sat, 22, May"}
                        Service={"Boom service"}
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        PostedBy={"Posted by Kevin Concrete Pumping"}
                        Urgent={false}
                        Onpress={this.navigate("JobDetails", "apply")}
                    />

                    <JobList_Component 
                        // isDisabled={this.state.Check_Type}
                        heading={"Box Hill North, VIC"}
                        Date={"Sat, 22, May"}
                        Service={"Boom service"}
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        PostedBy={"Posted by Kevin Concrete Pumping"}
                        Urgent={true}
                        Onpress={this.navigate("JobDetails", "apply")}
                    />

                    <JobList_Component 
                        // isDisabled={this.state.Check_Type}
                        heading={"Box Hill North, VIC"}
                        Date={"Sat, 22, May"}
                        Service={"Boom service"}
                        Duration={"4 hrs min / $160ph / $7m3 / $160 travel"}
                        PostedBy={"Posted by Kevin Concrete Pumping"}
                        Urgent={false}
                        Onpress={this.navigate("JobDetails", "apply")}
                    />
                    <View style={{height:hp("15%")}} />
                </ScrollView>
        //    </View>   
         );
     }
 }

 
function mapDispatchToProps(dispatch) {
    return{
        _ScreenType: (text)=> dispatch(ScreenTypeChange(text))
    }
}
export default connect(null, mapDispatchToProps)(JobList);

 const styles = StyleSheet.create({
    main:{
        // flex:1,
        width:"50%",
        backgroundColor:"red",
        padding:hp("5%"),
        paddingBottom:0,
        paddingTop:0
     },
 });