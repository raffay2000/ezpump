import React from 'react';

import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from "react-native-toast-message";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ForgetInput } from '../../ScreenComponent/TextInput';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import { semiBold } from '../../assets/fonts';
import { primary, secondary, white } from '../../assets/colors';
import { fetchAPI } from '../../services';
var FormData = require('form-data');
var that;
 class PasswordChange extends React. Component {
   
    constructor(props){
        super(props);
        this.state = {
            Password:"",
            Confirm_Password:"",
            show_Password: true,
            loading: false,
        }
    }
    componentDidMount(){
        that = this;
    }
    OnSavedPress = () => {
        Keyboard.dismiss()
        const {Password, Confirm_Password} = that.state;
        const {email} = that.props.route.params;
        console.log(email,"Password",Password,"Confirm_P",Confirm_Password);
        // if(!Password && !Confirm_Password){
        //     return Toast.show({text1: "Enter All Fields"})
        // }
        // if(Password.length < 6) return Toast.show({text1: "Password must be strong"})
        // if(Password !== Confirm_Password){
        //     return Toast.show({text1: "Password Doesn't Matched"})
        // } 
        // that.setState({loading: true});
        // var data = new FormData();
        // data.append('email', email);
        // data.append('password', Password);
        // data.append('password_confirmation', Confirm_Password);

        
        // fetchAPI('post', 'reset-password', data)
        // .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     that.setState({loading: false})
        //     Toast.show({text1: response.data.message})
        //     if(response.data.message === "Password successfully updated."){
        //         return setTimeout(() => {
        //             this.props.navigation.navigate("Login")
        //         }, 1000);
        //     }
        //     else{
        //         return Toast.show({text1: response.data.message})
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     that.setState({loading: false})
        //     Toast.show({text1: "Some Problem Occurred"})
        // });
         
     }

    render(){
        const {loading, Password, Confirm_Password, show_Password} = this.state;
        const {email} = this.props.route.params;
        console.log(email);
        return(
            <>
                <View style={styles.Container} >
             <ScrollView style={{flex:1, backgroundColor:primary }} >
                    <Image source={require("../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("7%"), alignSelf:"center"}} />
                    
                    <Text style={[styles.Txt, {fontSize:hp("2%"), marginTop:hp("5%"), marginBottom:hp('2%')}]} >
                        Enter New Password
                    </Text>
                    <ForgetInput
                        value={Password}
                        OnChangeText={(text)=> that.setState({Password: text})}
                        // style={{ backgroundColor:"red" }}
                        // mainstyle={}
                        otherProps={{ 
                                placeholder:"Enter Password", 
                                secureTextEntry:show_Password?true:false 
                            }}
                        // IfShow={show_Password}
                        // Onpress={()=> that.setState({show_Password: !show_Password})}
                        // color={Secondary}
                        // name={"eye"}
                        // name1={"eye-off"}
                        // size={hp("3%")}
                    />

                    <Text style={[styles.Txt, {fontSize:hp("2%"), marginTop:hp("5%"), marginBottom:hp('2%')}]} >
                        Confirm New Password
                    </Text>
                    <ForgetInput
                        value={Confirm_Password}
                        OnChangeText={(text)=> that.setState({Confirm_Password: text})}
                        // style={{ backgroundColor:"red" }}
                        // mainstyle={}
                        otherProps={{ 
                                placeholder:"Confirm Password", 
                                secureTextEntry:show_Password?true:false 
                            }}
                        IfShow={show_Password}
                        Onpress={()=> that.setState({show_Password: !show_Password})}
                        color={secondary}
                        name={"eye"}
                        name1={"eye-off"}
                        size={hp("3%")}
                    />

                    <View style={styles.Btn_Container} >
                        <TouchableOpacity style={styles.btn} onPress={()=>that.props.navigation.goBack()} >
                            <Text style={[styles.Txt, {marginTop:0, fontSize:hp("2%")}]} > Back </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={this.OnSavedPress} >
                            <Text style={[styles.Txt, {marginTop:0, fontSize:hp("2%")}]} > Change </Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <ActivityIndicator 
                            style={{marginTop: hp('3%')}}
                            size={"large"}
                            color={secondary}
                        />
                    }
                    <View style={{height:hp("5%")}} />
                </ScrollView>
                <SnackBar position={"bottom"}/>
                </View>
            </>
        ); 
     }
    

     
 }

const styles = StyleSheet.create({ 
    Top:{
        // position:"absolute",
        width:"100%",
        height:hp("10%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:secondary,
        // top:"9%",
        marginTop:hp("-2%"),
        // zIndex:0
    },
    Txt:{
        fontSize:hp("2.5%"),
        fontFamily:semiBold,
        lineHeight:hp("2.8%"),
        color:white,
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
   
    Container:{
        // flex:1,
        // backgroundColor:white,
        // padding:hp("3%"),
        // paddingTop:hp("3%")
        flex:1,
        backgroundColor:primary,
        padding:hp("3.5%"),
        // paddingBottom:0
        paddingVertical:0
        // alignItems:"center"
    },
    InputStyle:{
        width:"85%",
        height:hp("5%"),
        paddingLeft:hp("0.5%"),
        fontSize:hp("1.8%"),
        fontFamily:semiBold,
        backgroundColor:"white",
        // lineHeight:hp("2%"),
        color:"black",
        letterSpacing:1.5,
        borderRadius:hp("0.8%"),
        borderColor:"black",
        borderWidth:hp("0.2%"),
        marginTop:hp("1%")
    },
    Btn_Container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:hp("5%")
    },
    btn:{
        height:hp("5%"),
        width:"46%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:hp("0.8%"),
        backgroundColor:secondary
    }
});
 
 export default PasswordChange;