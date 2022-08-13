import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView
 } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import { bold, regular, semiBold } from '../../assets/fonts';
import { white } from '../../assets/colors';

 export default class PaymentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            CardHolderName:"",
            Card_Number:"",
            Exp_Month:0,
            Exp_Year:0,
            CVV:0,
            saved:false,
            // type:this.props.route.params.type
        }
    }
    componentDidMount(){

        // console.log('payment form',this.props.navigation.getState().routes[0].state.history[0].key.split('-')[0])
    }
     render() {
         return (
             <>
                <AppHeader
                    Heading={"PAYMENT METHOD"}
                    IsBack={true}
                    BorRadius={true}
                />
                <View style={styles.main} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={[styles.Txt, {marginTop:hp("4%")}]} >
                            Add Credit/Debit Card
                        </Text>

                        <Text style={[styles.Txt,{fontSize:hp("1.8%")}]} > Name on Card</Text>
                        <TextInput 
                            value={this.state.CardHolderName}
                            onChangeText={(text)=> this.setState({CardHolderName: text})}
                            placeholder={"Kevin Martin"}
                            style={styles.InputStyle}
                            onSubmitEditing={() => this.NextInput.focus()}
                            blurOnSubmit={false}
                        />

                        <Text style={[styles.Txt,{fontSize:hp("1.8%")}]} > Credit card number</Text>
                        <TextInput 
                            ref={ref => { this.NextInput = ref; }}
                            value={this.state.Card_Number}
                            onChangeText={(text)=> this.setState({Card_Number:text})}
                            placeholder={"3489-7596-1234-4686"}
                            style={styles.InputStyle}
                            keyboardType="decimal-pad"
                            onSubmitEditing={() => this.NextInput2.focus()}
                            maxLength={16}
                            blurOnSubmit={false}
                        />

                        <View style={styles.Bottom_Era} >
                            <View style={{width:"22%"}} >
                                <Text style={[styles.Txt,{fontSize:hp("1.8%")}]} > Expiry</Text>
                                <TextInput 
                                    ref={ref => { this.NextInput2 = ref; }}
                                    value={parseInt(this.state.Exp_Month)}
                                    onChangeText={(text)=> this.setState({Exp_Month:text})}
                                    placeholder={"MM"}
                                    style={[styles.InputStyle, { width:"75%", paddingLeft:hp("1%")}]}
                                    keyboardType="decimal-pad"
                                    onSubmitEditing={() => this.NextInput3.focus()}
                                    maxLength={2}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={{width:"25%"}} >
                                <Text style={[styles.Txt,{fontSize:hp("1.8%")}]} ></Text>
                                <TextInput 
                                    ref={ref => { this.NextInput3 = ref; }}
                                    value={parseInt(this.state.Exp_Year)}
                                    onChangeText={(text)=> this.setState({Exp_Year:text})}
                                    placeholder={"YY"}
                                    style={[styles.InputStyle, {width:"70%", paddingLeft:hp("1%")}]}
                                    keyboardType="decimal-pad"
                                    onSubmitEditing={() => this.NextInput4.focus()}
                                    maxLength={4}
                                    blurOnSubmit={false}
                                />
                            </View>
                            
                            <View style={{width:"50%", alignItems:"flex-end"}} >
                                <Text style={[styles.Txt,{fontSize:hp("1.8%"), alignSelf:"center"}]} > CVV number</Text>
                                <TextInput 
                                    ref={ref => { this.NextInput4 = ref; }}
                                    value={parseInt(this.state.CVV)}
                                    onChangeText={(text)=> this.setState({CVV:text})}
                                    placeholder={"CVV"}
                                    style={[styles.InputStyle, {width:"75%", paddingLeft:hp("1%")}]}
                                    keyboardType="decimal-pad"
                                    maxLength={3}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        {/* <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=> this.props.navigation.navigate("PaymentMethod",{type: this.state.type})} > */}
                        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=> this.props.navigation.navigate("PaymentMethod")} >
                            <Text style={[styles.Txt, {color:"#FFFFFF", marginTop:0}]} >
                                CONTINUE
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.setState({saved: !this.state.saved})} style={{flexDirection:"row",alignItems:"center", justifyContent:"center", alignSelf:"center", marginTop:hp("3%")}} >
                        {this.state.saved &&  <Ionicons name="ios-checkmark-circle" color={"green"} size={hp("3%")} style={{marginTop:hp("2%")}} />}
                            <Text style={[styles.Txt, {fontFamily:bold, fontSize:hp("1.5%"), color:this.state.saved?"green":"#1E202B"}]} >
                                {
                                    this.state.saved?
                                    "Your Card Saved"
                                    :
                                    "Do You Want to Save card for future payments"
                                } 
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>            

             </>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
        backgroundColor:"#EEEEEE",
        padding:hp("3%"),
        paddingTop:0,
        paddingBottom:0,
     },
     Txt:{
        fontSize:hp("2.2%"),
        fontFamily:semiBold,
        lineHeight:hp("2.4%"),
        color:"#1E202B",
        letterSpacing:0.5,
        marginTop:hp("2%")
    },
    InputStyle:{
        // alignItems:"flex-start",
        // justifyContent:"flex-start",
        width:"100%",
        height:hp("5%"),
        backgroundColor:white,
        borderRadius:hp("0.8%"),
        paddingLeft:hp("4%"),
        fontSize:hp("1.8%"),
        fontFamily:regular,
        lineHeight:hp("1.8%"),
        color:"black",
        shadowColor:"#0000002E",
        shadowOffset:{width:0, height:3},
        shadowOpacity:4,
        shadowRadius:3,
        elevation:2,
        marginTop:hp("1%"),
        marginBottom:hp("1%"),
    },
    Bottom_Era:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    btn:{
        width:"75%",
        height:hp("5%"),
        borderRadius:hp("1.2%"),
        backgroundColor:"#FF4040",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:hp("3%")
    }
 });