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
import { Primary, Secondary, White } from '../../ScreenComponent/color';
import { Bold, Regular, SemiBold } from '../../ScreenComponent/Fonts';
import { OtherTextInput } from '../../ScreenComponent/TextInput';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import { jobType, pumpType, state } from '../../RawData';
import BouncyCheckbox from "react-native-bouncy-checkbox";

function Availablity({IsValue , OnChange, Day, isChecked}) {
    return(
        <View style={styles.Container} >
           <View style={{width:"30%", alignItems:"center", justifyContent:"center"}} >
               <Text style={{color:Primary , fontSize:hp("1.8%"), lineHeight:hp("1.9%")}} > {Day} </Text>
           </View>
            <View style={{width:"70%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
                <BouncyCheckbox
                     size={12}
                     fillColor="red"
                     unfillColor="#FFFFFF"
                     text="AM"
                     iconStyle={{ borderColor: "red" }}
                     textStyle={{ fontFamily: Regular, fontSize:hp("1.8%") }}
                    //  onPress={()=> alert("polo")}
                />
                <BouncyCheckbox
                     size={12}
                     fillColor="red"
                     unfillColor="#FFFFFF"
                     text="PM"
                     iconStyle={{ borderColor: "red" }}
                     textStyle={{ fontFamily: Regular, fontSize:hp("1.8%") }}
                    //  onPress={()=> alert("polo")}
                />
                <Switch 
                    value={IsValue} 
                    onChange={OnChange} 
                    thumbColor={IsValue?Secondary:"gray"} 
                    trackColor={{false:'lightgray', true:'lightgray'}}   
                />
            </View>
        </View>
    );
}

 export default class PumpDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            Monday_Checked:false,
            Tuesday_Checked:true,
            Wednesday_Checked:false,
            Thursday_Checked:true,
            Friday_Checked:false,
            Saturday_Checked:false,
            Sunday_Checked:false,
            Line:0,
            volume:0,
        }
    }

     render() {
         return (
                <>
                    <AppHeader 
                        Heading={"PUMPS"}
                        IsBack={true}
                        BorRadius={true}
                    />
                    <View style={styles.main} >
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Text style={[styles.Txt,{marginTop:hp("2%")}]} >Setup your pump details</Text>
                            <DropDownComponent 
                                label={"State"}
                                data={state}
                            />
                            <DropDownComponent 
                                label={"Job Type"}
                                data={jobType}
                            />
                            <DropDownComponent 
                                label={"Pump Type"}
                                data={pumpType}
                            />
                      
                            <OtherTextInput 
                                Field={"Line Length"}
                                value={parseInt(this.state.Line)}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({Line: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />

                            <OtherTextInput 
                                Field={"Mᵌ"}
                                value={parseInt(this.state.volume)}
                                style={{width:"60%", textAlign:"center"}}
                                mainstyle={{marginTop:hp("2%")}}
                                OnChangeText={(text)=> this.setState({volume: text})}
                                otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                            />

                            <View style={styles.Mid_Heading} >
                                <Text style={[styles.Txt, {color:White, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:SemiBold}]} >Availability</Text>
                            </View>

                            <Availablity Day={"Monday"} IsValue={this.state.Monday_Checked} OnChange={()=> this.setState({Monday_Checked: !this.state.Monday_Checked})} />
                            <Availablity Day={"Tuesday"} IsValue={this.state.Tuesday_Checked} OnChange={()=> this.setState({Tuesday_Checked: !this.state.Tuesday_Checked})} />
                            <Availablity Day={"Wednesday"} IsValue={this.state.Wednesday_Checked} OnChange={()=> this.setState({Wednesday_Checked: !this.state.Wednesday_Checked})} />
                            <Availablity Day={"Thursday"} IsValue={this.state.Thursday_Checked} OnChange={()=> this.setState({Thursday_Checked: !this.state.Thursday_Checked})} />
                            <Availablity Day={"Friday"} IsValue={this.state.Friday_Checked} OnChange={()=> this.setState({Friday_Checked: !this.state.Friday_Checked})} />
                            <Availablity Day={"Saturday"} IsValue={this.state.Saturday_Checked} OnChange={()=> this.setState({Saturday_Checked: !this.state.Saturday_Checked})} />
                            <Availablity Day={"Sunday"} IsValue={this.state.Sunday_Checked} OnChange={()=> this.setState({Sunday_Checked: !this.state.Sunday_Checked})} />
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
        fontFamily:Regular,
        lineHeight:hp("1.8%"),
        color:"#979797",
        letterSpacing:0.5,
    },
    DropDownStyle:{
        width:"100%", 
        paddingLeft:hp("5%"), 
        height:hp("5%"), 
        borderColor:White,
        backgroundColor:White, 
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
        borderColor:White,
        backgroundColor:White, 
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
        backgroundColor:White,
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
        fontFamily:Bold,
        lineHeight:hp("2.2%"),
        color:"white",
        letterSpacing:0.5,
    }
 });