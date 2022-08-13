import React, { Component, useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
 } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { OtherTextInput } from '../../ScreenComponent/TextInput';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import { jobType, pumpType, state } from '../../utils/RawData';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primary, secondary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { connect } from 'react-redux';

function Availability({OnChange, Day, isChecked, am, pm}) {
    return(
        <View style={styles.Container} >
           <View style={{width:"30%", alignItems:"center", justifyContent:"center"}} >
               <Text style={{color:primary , fontSize:hp("1.8%"), lineHeight:hp("1.9%")}} > {Day} </Text>
           </View>
            <View style={{width:"70%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
                <BouncyCheckbox
                     size={12}
                     fillColor="red"
                     unfillColor="#FFFFFF"
                     text="AM"
                     iconStyle={{ borderColor: "red" }}
                     textStyle={{ fontFamily: regular, fontSize:hp("1.8%") }}
                    //  onPress={()=> alert("polo")}
                />
                <BouncyCheckbox
                     size={12}
                     fillColor="red"
                     unfillColor="#FFFFFF"
                     text="PM"
                     iconStyle={{ borderColor: "red" }}
                     textStyle={{ fontFamily: regular, fontSize:hp("1.8%") }}
                    //  onPress={()=> alert("polo")}
                />
                <Switch 
                    value={isChecked} 
                    onChange={OnChange} 
                    thumbColor={isChecked ? secondary :"gray"} 
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
            line:0,
            volume:0,

            type: this.props.route.params.type, // true for add new pump // false for edit pump
        }
    }
    renderPumpTypes() {
        return this.props.pumpTypes.map(item=> ({label: item.type_name, value: item.id}))
    }
    renderJobTypes() {
        return this.props.jobTypes.map(item=> ({label: item.type_name, value: item.id}))
    }

    render() {
        const { type, availability, line, volume  } = this.state;
        const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = availability;
        const { jobTypes, pumpTypes } = this.props;
        return (
                <>
                    <AppHeader 
                        Heading={type ? "ADD PUMP" : "EDIT PUMP"}
                        IsBack={true}
                        BorRadius={true}
                    />
                    <View style={styles.main} >
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Text style={[styles.Txt,{marginTop:hp("2%")}]} >Setup your pump details</Text>
                            <DropDownComponent 
                                label={"State"}
                                data={state}
                                selectedValue={'Colorado'}
                            />
                            <DropDownComponent 
                                label={"Job Type"}
                                data={jobTypes}
                            />
                            <DropDownComponent 
                                label={"Pump Type"}
                                data={pumpTypes}
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

                            <View style={styles.Mid_Heading} >
                                <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Availability</Text>
                            </View>

                            <Availability Day={"Monday"} isChecked={monday.on} am={monday.am} pm={monday.pm} OnChange={()=> this.setState({monday: !monday})} />
                            <Availability Day={"Tuesday"} isChecked={tuesday.on} am={tuesday.am} pm={tuesday.pm} OnChange={()=> this.setState({tuesday: !tuesday})} />
                            <Availability Day={"Wednesday"} isChecked={wednesday.on} am={wednesday.am} pm={wednesday.pm} OnChange={()=> this.setState({wednesday: !wednesday})} />
                            <Availability Day={"Thursday"} isChecked={thursday.on} am={thursday.am} pm={thursday.pm} OnChange={()=> this.setState({thursday: !thursday})} />
                            <Availability Day={"Friday"} isChecked={friday.on} am={friday.am} pm={friday.pm} OnChange={()=> this.setState({friday: !friday})} />
                            <Availability Day={"Saturday"} isChecked={saturday.on} am={saturday.am} pm={saturday.pm} OnChange={()=> this.setState({saturday: !saturday})} />
                            <Availability Day={"Sunday"} isChecked={sunday.on} am={sunday.am} pm={sunday.pm} OnChange={()=> this.setState({sunday: !sunday})} />
                            <TouchableOpacity style={styles.Btn} onPress={()=> this.props.navigation.goBack()} >
                                <Text style={styles.Btn_Txt} > ADD NEW PUMP </Text>
                            </TouchableOpacity>

                            <View style={{height:hp("5%")}} />
                        </ScrollView>

                   </View>
                </>
        );
    }
}

const mapStateToProps = state => {
    return{
        jobTypes: state.appReducer.jobTypes,
        pumpTypes: state.appReducer.pumpTypes,
    }
}

export default connect(mapStateToProps, null)(AddEditPump);

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