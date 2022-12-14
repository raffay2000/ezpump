import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
 } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { OtherTextInput } from '../../ScreenComponent/TextInput';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primary, secondary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { connect } from 'react-redux';
import LabelInput from '../../ScreenComponent/common/LabelInput';
import Toast from 'react-native-toast-message';
import { addEditPump, deletePump, GetAllData } from '../../Redux/Action/PumpAction';
import { Button } from '../../ScreenComponent/common/Button';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SHOW_DELETE_PUMP_ALERT } from '../../Redux/Constants';


function Availability({OnChange, Day, availability}) {
    const { on, am, pm } = availability;
    // console.log(Day, availability)
    return(
        <View style={styles.Container} >
           <View style={{width:"30%", alignItems:"center", justifyContent:"center"}} >
               <Text style={{color:primary , fontSize:hp("1.8%"), lineHeight:hp("1.9%")}} > {Day} </Text>
           </View>
            <View style={{width:"70%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
                <BouncyCheckbox
                    size={12}
                    disabled={!on}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="AM"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: regular, fontSize:hp("1.8%") }}
                    onPress={(value)=> OnChange(Day.toLowerCase(), value, pm, on)}
                    
                />
                <BouncyCheckbox
                    size={12}
                    disabled={!on}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="PM"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: regular, fontSize:hp("1.8%") }}
                    onPress={(value)=> OnChange(Day.toLowerCase(), am, value, on)}
                    isChecked={pm}
                />
                <Switch 
                    value={on} 
                    onChange={(value)=> OnChange(Day.toLowerCase(), am, pm, !on)} 
                    thumbColor={on ? secondary :"gray"} 
                    trackColor={{false:'lightgray', true:'lightgray'}}   
                />
            </View>
        </View>
    );
}

class AddEditPump extends Component{

    constructor(props){
        super(props);
        this.state={
            availability: {
                monday: { on: false, am: false, pm: false },
                tuesday: { on: false, am: false, pm: false },
                wednesday: { on: false, am: false, pm: false },
                thursday: { on: false, am: false, pm: false },
                friday: { on: false, am: false, pm: false },
                saturday: { on: false, am: false, pm: false },
                sunday: { on: false, am: false, pm: false },
            },
            stateValue: 'colorado',
            line:0,
            volume:0,
            jobType: 0,
            pumpType: 0,
            name: '',
            description: '',

            pump: this.props.route.params.pump, 
            id: this.props.route.params.id, // 0 for add new pump // id for edit pump

            deleteAlert: false,
        }
    }
    componentDidMount(){
        const {id, pump} = this.props.route.params;
        if(id){ // edit
            const {line_length, m3, state, job_type_id, pump_type_id, name, availability} = pump;
            const tempAvailability = {
                monday: JSON.parse(availability.monday),
                tuesday: JSON.parse(availability.tuesday),
                wednesday: JSON.parse(availability.wednesday),
                thursday: JSON.parse(availability.thursday),
                friday: JSON.parse(availability.friday),
                saturday: JSON.parse(availability.saturday),
                sunday: JSON.parse(availability.sunday),
            }
            console.log(tempAvailability)
            this.setState({
                line: line_length,
                volume: m3,
                stateValue: state,
                jobType: job_type_id,
                pumpType: pump_type_id,
                name,
                availability: tempAvailability
            })
        }
        this.props.GetAllData()
        console.log("JobType",this.props.alldata.job_types)
        // console.log(thisjob_types)
    }
    // GetAllData = async() => {
    //     // let response = await ;
    // }
    onAvailabilityChange = (day, am, pm, on) => {
        // return alert(am)
        const availability = this.state.availability;
        availability[day] = {am, pm, on}
        // console.log(availability[day])
        this.setState({availability})
    }
    onAddEditPump = () => {
        const {pump, id, line, volume, availability, jobType, pumpType, name, description, stateValue} = this.state;
        console.log(line, volume, availability,jobType, pumpType,name,description,stateValue);
        // if(line && volume && jobType && pumpType && name && stateValue){
        //     const {friday, monday, thursday,wednesday, saturday, sunday, tuesday} = availability
        //     if(friday.on || monday.on || thursday.on ||wednesday.on || saturday.on || sunday.on || tuesday){
        //         return this.props.addEditPump(
        //             id,
        //             line,
        //             volume,
        //             stateValue,
        //             jobType,
        //             pumpType,
        //             availability,
        //             name,
        //             description
        //         )
        //     }
        //     return Toast.show({text1: "Select Pump Availability"})
        // }
        // return Toast.show({text1: "Enter All Fields"})

    }
    onDeletePump = () => {
        const {id} = this.state;
        this.props.deletePump(id);
    }
    render() {
        const { id, availability, line, volume, jobType, pumpType, stateValue, name, description  } = this.state;
        // const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = availability;
        const { job_types, pump_types,days, loading, deleteLoading, deleteAlert,states } = this.props?.alldata;
        console.log(states)
        return (
                <>
                    <AppHeader 
                        Heading={id ? "EDIT PUMP" : "ADD PUMP" }
                        IsBack={true}
                        BorRadius={true}
                    />
                    <View style={styles.main} >
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Text style={[styles.Txt,{marginTop:hp("2%")}]} >Setup your pump details</Text>
                            <DropDownComponent 
                                label={"State"}
                                data={states}
                                selectedValue={states}
                            />
                            <DropDownComponent 
                                label={"Job Type"}
                                data={job_types}
                                selectedValue={job_types}
                                onChange={val=>this.setState({jobType: val})}
                            />
                            <DropDownComponent 
                                label={"Pump Type"}
                                data={pump_types}
                                selectedValue={pump_types}
                                onChange={val=>this.setState({pumpType: val})}
                            />
                            <OtherTextInput 
                                Field={"Line Length"}
                                value={line}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({line: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />
                            <OtherTextInput 
                                Field={"M???"}
                                value={volume}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({volume: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />
                            <LabelInput
                                value={name}
                                onChange={text=>this.setState({name: text})}
                                placeholder={"Enter Pump Name"}
                                style={{marginBottom:0, marginTop: hp("1%"), borderRadius: hp('1%'), height: hp('6%')}}
                                inputStyle={{backgroundColor: 'white', borderWidth: 0, fontSize: hp('2%')}}
                            />
                            <LabelInput
                                value={description}
                                multiline
                                onChange={text=>this.setState({description: text})}
                                placeholder={"Enter Description"}
                                style={{marginBottom:0, marginTop: hp("2%"), borderRadius: hp('1%'), height: hp('17%')}}
                                inputStyle={{backgroundColor: 'white', borderWidth: 0, fontSize: hp('2%'), height: hp('15%'), textAlignVertical: 'top'}}
                            />
                            <View style={styles.Mid_Heading} >
                                <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Availability</Text>
                            </View>
                            <Availability Day={"Monday"} availability={availability['monday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Tuesday"} availability={availability['tuesday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Wednesday"} availability={availability['wednesday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Thursday"} availability={availability['thursday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Friday"} availability={availability['friday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Saturday"} availability={availability['saturday']} OnChange={this.onAvailabilityChange} />
                            <Availability Day={"Sunday"} availability={availability['sunday']} OnChange={this.onAvailabilityChange} />
                            <Button
                                color={primary}
                                loading={loading}
                                text={id ? "EDIT PUMP" : "ADD NEW PUMP"}
                                textColor={white}
                                onPress={this.onAddEditPump}
                                style={{alignSelf: 'center', marginTop: hp('3%')}}
                            />
                            {id ?
                                <Button
                                    color={secondary}
                                    text={"DELETE PUMP"}
                                    textColor={white}
                                    onPress={()=>this.props.showDeleteAlert()}
                                    style={{alignSelf: 'center', marginTop: hp('3%')}}
                                />
                                :null
                            }
                            <View style={{height:hp("5%")}} />
                        </ScrollView>
                        <AwesomeAlert 
                            show={deleteAlert}
                            showProgress={deleteLoading}
                            progressColor={"red"}
                            progressSize={25}
                            title='Confirm'
                            message="Are you sure you want to delete this pump?" 
                            titleStyle={{color: secondary}}
                            messageStyle={{ fontSize:hp("2.25%")}}
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}
                            showConfirmButton={true}
                            showCancelButton={true}
                            confirmText="Yes"
                            onCancelPressed={()=> this.setState({deleteAlert: false})}
                            onConfirmPressed={this.onDeletePump}
                            contentContainerStyle={{width:hp("100%") , backgroundColor:"#FFFFFF", height: deleteLoading ? hp("27%"):hp("24%") ,}}
                            confirmButtonColor={secondary}
                            cancelButtonColor="#979797"
                            cancelButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                            confirmButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                            confirmButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0}}
                            cancelButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0}}
                        />
        
                    </View>
                    <SnackBar position={'top'}/>
                </>
        );
    }
}

const mapStateToProps = state => {
    return{
        jobTypes: state.appReducer.jobTypes,
        pumpTypes: state.appReducer.pumpTypes,
        alldata: state.pumpReducer.alldata,
        loading: state.pumpReducer.actionLoading,
        deleteLoading: state.pumpReducer.deleteLoading,
        deleteAlert: state.pumpReducer.deleteAlert,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        addEditPump: (pump_id, line, volume, stateValue, jobType, pumpType, availability, name, description) => dispatch(addEditPump(pump_id, line, volume, stateValue, jobType, pumpType, availability, name, description)),
        deletePump: (pump_id) => dispatch(deletePump(pump_id)),
        showDeleteAlert: ()=>dispatch({ type: SHOW_DELETE_PUMP_ALERT }),
        GetAllData: ()=>dispatch(GetAllData()) 

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPump);

const styles = StyleSheet.create({
    main:{
        flex:1,
        // width:"100%",
        backgroundColor:"#EEEEEE",
        padding:hp("2%"),
        paddingBottom:0,
        paddingTop:0
    },
    Txt:{
        fontSize:hp("1.5%"),
        fontFamily:regular,
        lineHeight:hp("1.8%"),
        color:"#979797",
        letterSpacing:0.5,
    },
    DropDownStyle:{
        width:"100%", 
        paddingLeft:hp("5%"), 
        height:hp("5%"), 
        borderColor:white,
        backgroundColor:white, 
        shadowColor:"#00000029", 
        shadowOffset:{width:0, height:3}, 
        shadowRadius:6, 
        elevation:6
    },
    miniContainer:{
        height:hp("5%"), 
        marginTop:hp("1%"), 
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%", 
        paddingLeft:hp("5%"),
        paddingRight:hp("5%"), 
        borderRadius:hp("1%"),
        borderColor:white,
        backgroundColor:white, 
        shadowColor:"#00000029", 
        shadowOffset:{width:0, height:3}, 
        shadowRadius:6, 
        elevation:6
    },
    Mid_Heading:{
        // width:wp("100%"),
        width:"100%",
        // flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#979797",
        height:hp("5%"),
        marginTop:hp("3%"),
        // marginLeft:hp("-2%"),
        // marginRight:hp("-3%"),
        marginBottom:hp("1%")
    },
    Container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:white,
        width:"100%",
        height:hp("5%"),
        borderRadius:hp("1%"),
        marginTop:hp("2%"),
        shadowColor:"#00000029",
        shadowRadius:6,
        shadowOffset:{width:0, height:3},
    },
    Btn:{
        height:hp("5%"), 
        marginTop:hp("4%"), 
        justifyContent:"center",
        alignItems:"center",
        width:"70%",
        borderRadius:hp("1%"),
        backgroundColor:"#FF4040",
        alignSelf:"center"
    },
    Btn_Txt:{
        fontSize:hp("2%"),
        fontFamily:bold,
        lineHeight:hp("2.2%"),
        color:"white",
        letterSpacing:0.5,
    }
 });