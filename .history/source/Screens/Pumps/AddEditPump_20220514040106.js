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
import { state } from '../../utils/RawData';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primary, secondary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { connect } from 'react-redux';
import LabelInput from '../../ScreenComponent/common/LabelInput';
import Toast from 'react-native-toast-message';
import { addEditPump } from '../../Redux/Action/PumpAction';
import { Button } from '../../ScreenComponent/common/Button';
import SnackBar from '../../ScreenComponent/common/SnackBar';


function Availability({OnChange, Day, availability}) {
    const { on, am, pm } = availability;
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
            description: '',

            pump: this.props.route.params.pump, 
            id: this.props.route.params.id, // 0 for add new pump // id for edit pump
        }
    }
    componentDidMount(){
        const {id, pump} = this.props.route.params;
        if(id){ // edit
            console.log('pump', pump)
            const {} = pump;
        }
    }
    onAvailabilityChange = (day, am, pm, on) => {
        // return alert(am)
        const availability = this.state.availability;
        availability[day] = {am, pm, on}
        // console.log(availability[day])
        this.setState({availability})
    }
    onAddEditPump = () => {
        const {pump, id, line, volume, availability, jobType, pumpType, description, stateValue} = this.state;
        // console.log(line, volume, availability,jobType, pumpType);
        if(line && volume && jobType && pumpType && description && stateValue){
            const {friday, monday, thursday,wednesday, saturday, sunday, tuesday} = availability
            if(friday.on || monday.on || thursday.on ||wednesday.on || saturday.on || sunday.on || tuesday){
                return this.props.addEditPump(
                    id,
                    line,
                    volume,
                    stateValue,
                    jobType,
                    pumpType,
                    availability,
                    description
                )
            }
            return Toast.show({text1: "Select Pump Availability"})
        }
        return Toast.show({text1: "Enter All Fields"})

    }
    render() {
        const { id, pump, availability, line, volume, jobType, pumpType, stateValue, description  } = this.state;
        // const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = availability;
        const { jobTypes, pumpTypes, loading } = this.props;
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
                                data={state}
                                selectedValue={stateValue}
                            />
                            <DropDownComponent 
                                label={"Job Type"}
                                data={jobTypes}
                                selectedValue={jobType}
                                onChange={val=>this.setState({jobType: val})}
                            />
                            <DropDownComponent 
                                label={"Pump Type"}
                                data={pumpTypes}
                                selectedValue={pumpType}
                                onChange={val=>this.setState({pumpType: val})}

                            />
                      
                            <OtherTextInput 
                                Field={"Line Length"}
                                value={parseInt(line)}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({line: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />

                            <OtherTextInput 
                                Field={"Mᵌ"}
                                value={parseInt(volume)}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({volume: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />
                            <LabelInput
                                value={description}
                                onChange={text=>this.setState({description: text})}
                                // label={"Description"}
                                placeholder={"Enter Description"}
                                multiline
                                style={{height: hp('17%')}}
                                inputStyle={{backgroundColor: 'white', borderWidth: 0, minHeight: hp('15%'), textAlignVertical: 'top', fontSize: hp('2%')}}
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
                                color={secondary}
                                loading={loading}
                                text={id ? "EDIT PUMP" : "ADD NEW PUMP"}
                                textColor={white}
                                onPress={this.onAddEditPump}
                                style={{alignSelf: 'center', marginTop: hp('3%')}}
                            />

                            <View style={{height:hp("5%")}} />
                        </ScrollView>
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

        loading: state.pumpReducer.actionLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        addEditPump: (pump_id, line, volume, stateValue, jobType, pumpType, availability, description) => dispatch(addEditPump(pump_id, line, volume, stateValue, jobType, pumpType, availability, description))
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