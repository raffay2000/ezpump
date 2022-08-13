import React, { Component, useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform
 } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import { OtherTextInput } from '../../ScreenComponent/TextInput';
import DateTimePicker from "@react-native-community/datetimepicker";
import { jobType, pumpType, states } from '../../utils/RawData';
import DropDownComponent from '../../ScreenComponent/DropDownPicker_Component';
import TermsModal from '../../ScreenComponent/create-job/TermsModal';
import { secondary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { formatDate } from '../../utils';
import { connect } from 'react-redux';
import { createJob } from '../../Redux/Action/JobAction';
import { fetchAPI } from '../../services';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import { Button } from '../../ScreenComponent/common/Button';

var FormData = require('form-data');
var that;


class Create_Job extends Component{

    constructor(props){
        super(props);
        this.state={
            Description:"",
            Add_1:"",
            Add_2:"",
            Line:0,
            volume:0,
            priceFrom:0,
            priceTo:0,
            jobType: 0,
            pumpType: 0, 
            map: {lat:0, lng: 0},
            stateValue: 'colorado', 
            Show_Picker:false,
            //////////
            date:'',
            time:'',
            // points: 0,
            mode:'date',
            showDatePicker:false,
            // toggle:false,

            termsModal: false,
            termsAccepted: false,
            loading: false,


        }
    }

    componentDidMount(){
        this.SelectedItems;
        that = this;
    }

    SelectedItems = () =>{
            List_Services.map(e=> items.push({label: e.title,  value:e.title}))
            // console.log(abc)
    }

    onMapPress = () => {
        alert('map pressed')
    }

    onChanges = (event, selectedValue) => {
        this.setState({showDatePicker: Platform.OS === 'ios'})
            if (this.state.mode === 'date') {
                const currentDate = selectedValue || this.state.date;
                this.setState({date: currentDate})
                // this.setState({toggle: !this.state.toggle})
            } else {
                const selectedTime = selectedValue || this.state.time;
                this.setState({time: selectedTime})
                this.setState({showDatePicker: Platform.OS === 'ios'});
                // this.setState({toggle: !this.state.toggle})
            }
    };
        
    showMode = (currentMode) => {
        this.setState({mode: currentMode, },()=>{
            this.setState({showDatePicker: !this.state.showDatePicker})
        })
    };
    
    showDatePicker = () => {
        this.showMode('date')
    };
    
    showTimePicker = ()=>{
        this.showMode('time')
    }
    onAcceptPress = () => {
        this.setState({termsModal: false, loading: true});
        const {Add_1, Add_2, Description, Line, time, date, volume, map, stateValue, priceFrom, priceTo, pumpType, jobType, } = this.state;
        const {lat, lng} = map;
        // return console.log(typeof 'asd asd'.split(' '))
       

            var newDate = formatDate(date, time);
            newDate =  newDate.split(' ');
            
            // if(parseInt(points) > 10 ) return Toast.show({text1: "Points must not exceed 10"});

            var data = new FormData();
            data.append('job_type_id', jobType);
            data.append('pump_type_id', pumpType);
            // data.append('pump_id', '');
            data.append('description', Description);
            data.append('address_1', Add_1);
            data.append('address_2', Add_2);
            data.append('lat', lat);
            data.append('lng', lng);
            data.append('line_length', Line);
            data.append('state',  stateValue);
            data.append('m3', volume);
            data.append('date', newDate[0]);
            data.append('time', newDate[1]);
            data.append('points', points);
            data.append('price_from', priceFrom);
            data.append('price_to', priceTo);
    
            console.log(data)
    
            fetchAPI('post', 'job/create-job',  data, true)
            .then(function (response) {
                Toast.show({text1: response.data.message});
                if(response.data.success){
                    that.setState({
                        jobType : "",
                        pumpType : "",
                        Description : "",
                        Add_1 : "",
                        Add_2 : "",
                        map: {lat:0, lng: 0},
                        Line : "",
                        stateValue : "",
                        volume : "",
                        date : "",
                        time : "",
                        priceFrom : "",
                        priceTo : "",
                        loading: false,
                    });
                }else{
                    that.setState({loading: false});
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                Toast.show({text1: "Some Problem Occurred"});
                that.setState({
                    loading: false,    
                }); 
            });
        


        
        // this.props.createJob(

        // )
    }

    onPostJobPress = () => {
        const {Add_1, Add_2, Description, Line, time, date, volume, map, stateValue, priceFrom, priceTo, pumpType, jobType, } = this.state;
        const {lat, lng} = map;
        if(Add_1 && Add_2 && Description && Line && time && date && volume && 
            // map && 
            stateValue && priceFrom && priceTo && pumpType && jobType ){
                this.setState({termsModal: true});
    
        }else{
            Toast.show({text1: "Fill all fields"});
        }
    }
    render(){
        const {loading, Add_1, Add_2, Description, Line, mode, date, time, volume, jobType, pumpType, showDatePicker, termsModal, priceFrom, priceTo, stateValue } = this.state;
        const { jobTypes, pumpTypes } = this.props;
        return(
            <>
                <AppHeader
                    Heading={"CREATE JOB"}
                    borderRadius  
                />
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                    <View style={styles.main}>
                        <Text style={[styles.Txt, {marginTop:hp("2%"), fontSize:hp("1.8%"), fontFamily:bold}]} > Create a job for Pumping Company </Text>
                        <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Pump Details</Text>
                        </View>
                        <DropDownComponent 
                            label={"State"}
                            data={states}
                            selectedValue={stateValue}
                            onChange={()=>null}
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
                            value={Line}
                            style={{width:"60%", textAlign:"center"}}
                            mainstyle={{marginTop:hp("2%")}}
                            OnChangeText={(text)=> this.setState({Line: text})}
                            otherProps={{placeholder:"45", maxLength:6, keyboardType:"decimal-pad"}}
                        />
                        <OtherTextInput 
                            Field={"Mᵌ"}
                            value={volume}
                            style={{width:"60%", textAlign:"center"}}
                            mainstyle={{marginTop:hp("2%")}}
                            OnChangeText={(text)=> this.setState({volume: text})}
                            otherProps={{placeholder:"30", maxLength:6, keyboardType:"decimal-pad"}}
                        />
                        <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Job Description</Text>
                        </View>
                        <TextInput
                            value={Description}
                            onChangeText={(text)=> this.setState({Description: text})}
                            placeholder={"Job description"}
                            multiline={true}
                            style={styles.InputStyle}
                        />
                        <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Address</Text>
                        </View>

                        <TextInput
                            value={Add_1}
                            onChangeText={(text)=> this.setState({Add_1: text})}
                            placeholder={"Address Line 1"}
                            style={[styles.InputStyle,{height:hp("5%"),marginTop:hp("2%")}]}
                        />

                        <TextInput
                            value={Add_2}
                            onChangeText={(text)=> this.setState({Add_2: text})}
                            placeholder={"Address Line 2"}
                            style={[styles.InputStyle,{height:hp("5%"),marginTop:hp("1%")}]}
                        />

                        <View style={[styles.miniContainer,{marginTop:hp("1%"), paddingLeft:hp("1%"), paddingRight:hp("1%")}]} >
                            <Text style={[styles.Txt, {color:"#979797"}]} >Map</Text>
                            <Ionicons onPress={this.onMapPress} name="location" color={"#1E202B"} size={hp("3%")} />
                        </View>
                        <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Date &amp; Time </Text>
                        </View>
                        <View style={[styles.miniContainer,{marginTop:hp("2%"), paddingLeft:hp("1%"), paddingRight:hp("1%")}]} >
                            <Text style={[styles.Txt, {color:"#979797"}]} >Date</Text>
                            <TouchableOpacity onPress={this.showDatePicker} style={{flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}} >
                                <Text style={[styles.Txt, {color:"#979797", fontFamily:bold}]} >{formatDate(date,"")}</Text>
                                <Ionicons name="calendar" color={"#1E202B"} size={hp("3%")} style={{marginLeft:hp("1.5%")}} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.miniContainer,{marginTop:hp("2%"), paddingLeft:hp("1%"), paddingRight:hp("1%")}]} >
                            <Text style={[styles.Txt, {color:"#979797"}]} >Time</Text>
                            <TouchableOpacity onPress={this.showTimePicker} style={{flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}} >
                                <Text style={[styles.Txt, {color:"#979797", fontFamily:bold}]} >{formatDate("",time)}</Text>
                                <Ionicons name="ios-time-outline" color={"#1E202B"} size={hp("3%")} style={{marginLeft:hp("1.5%")}}  />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Points</Text>
                        </View>
                        <View style={[styles.row, {backgroundColor:'white', marginHorizontal:hp('2%'), marginVertical: hp('5%'), borderRadius: hp('2%'), height: hp('7.5%') }]}>
                            <Text style={[styles.label,{flex:1, marginHorizontal: hp('2%')}]}>Job Points</Text>
                            <TextInput
                                value={points}
                                maxLength={2}
                                onChangeText={(points)=>this.setState({points})}
                                style={[styles.label,{fontFamily: bold, width:'50%',  height: hp('7.5%'), flex:1.5}]}
                                placeholder={"Enter Job Points"}
                            />
                        </View> */}

                        <View style={styles.Mid_Heading} >
                            <Text style={[styles.Txt, {color:white, fontSize:hp("1.6%"), lineHeight:hp("1.7%"), fontFamily:semiBold}]} >Budget</Text>
                        </View>
                        <View style={[styles.row, {backgroundColor:'white', marginHorizontal:hp('2%'), marginVertical: hp('5%'), borderRadius: hp('2%'), height: hp('7.5%') }]}>
                            <Text style={[styles.label,{flex:1, marginHorizontal: hp('2%')}]}>Price Range</Text>
                            <View style={[styles.row,{flex:2, justifyContent: 'flex-end'}]} >
                                <View style={[styles.row,{borderRightWidth:1, borderColor: 'black', marginRight: hp('1%')}]}>
                                    <Text style={[styles.label,{fontFamily: regular, fontSize: hp('1.75%')}]}>From</Text>
                                    <View style={[styles.row, styles.input]}>
                                        <Text style={[styles.label,{fontFamily: bold}]}>$</Text>
                                        <TextInput
                                            value={priceFrom}
                                            onChangeText={(text)=>this.setState({priceFrom: text})}
                                            placeholder={"00"}
                                            style={[styles.label,{fontFamily: bold, maxWidth: hp('7%'),  height: hp('7.5%')}]}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                </View>
                                <View  style={[styles.row, { marginRight: hp('2%')}]}>
                                    <Text style={[styles.label,{fontFamily: regular, fontSize: hp('1.75%')}]}>To</Text>
                                    <View style={[styles.row, styles.input]}>
                                        <Text style={[styles.label,{fontFamily: bold}]}>$</Text>
                                        <TextInput
                                            value={priceTo}
                                            onChangeText={(text)=>this.setState({priceTo: text})}
                                            placeholder={"00"}
                                            style={[styles.label,{fontFamily: bold, maxWidth: hp('7%'), height: hp('7.5%')}]}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Button
                            text={"POST JOB"}
                            loading={loading}
                            color={secondary}
                            textColor={white}
                            style={{width: '75%', alignSelf: "center"}}
                            onPress={this.onPostJobPress}
                        />
                        {/* // <TouchableOpacity style={styles.Btn} onPress={} >
                        //     <Text style={styles.Btn_Txt} > POST JOB </Text>
                        // </TouchableOpacity> */}
                    </View>
                    <View style={{height:hp("5%")}} />
                </ScrollView>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode={mode}
                        display="default"
                        onChange={this.onChanges}
                        dateFormat="day month year"
                        style={{width:hp("10%") , height:hp("4%")}}
                    />
                )}
                <TermsModal
                    visible={termsModal}
                    onBackPress={()=>this.setState({termsModal: false})}
                    onPress={this.onAcceptPress}

                />
                <SnackBar position={"top"}/>
           </>
         );
     }
}

const mapStateToProps = state => {
    return{
        jobTypes: state.appReducer.jobTypes,
        pumpTypes: state.appReducer.pumpTypes,

        // loading: state.jobReducer.loading,
        // deleteLoading: state.pumpReducer.deleteLoading,
        // deleteAlert: state.pumpReducer.deleteAlert,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        // createJob: (state,jobType, pumpType, line, volume, desc, add1, add2, map, date, time, priceFrom, priceTo)=>dispatch(createJob(state,jobType, pumpType, line, volume, desc, add1, add2, map, date, time, priceFrom, priceTo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_Job);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#EEEEEE",
        padding:hp("1.5%")
    },
    Txt:{
        fontSize:hp("1.5%"),
        fontFamily:regular,
        lineHeight:hp("1.8%"),
        color:"#979797",
        letterSpacing:0.5,
    },
    Mid_Heading:{
        // width:wp("100%"),
        width:"110%",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#979797",
        height:hp("5%"),
        marginTop:hp("3%"),
        marginLeft:hp("-1.5%"),
        marginRight:hp("-3%"),
        // marginBottom:hp("3%")
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
        marginTop:hp("2%"), 
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
    InputStyle:{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:"100%",
        height:hp("20%"),
        backgroundColor:white,
        borderRadius:hp("1.1%"),
        paddingLeft:hp("1%"),
        fontSize:hp("1.8%"),
        fontFamily:regular,
        lineHeight:hp("1.8%"),
        color:"black",
        shadowColor:"#00000029",
        shadowOffset:{width:0, height:3},
        shadowOpacity:4,
        shadowRadius:2,
        elevation:3,
        marginTop:hp("2%"),
        marginBottom:hp("2%"),
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
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    label:{
        fontSize: hp('2%'),
        fontFamily: semiBold,
    },
    input:{
        height: hp('5.5%'),
        marginHorizontal: hp('1%'),
    }
 });