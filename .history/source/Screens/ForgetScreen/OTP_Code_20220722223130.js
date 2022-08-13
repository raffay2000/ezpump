import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {InputComponent} from "../../ScreenComponent/TextInput";
import Toast from "react-native-toast-message";
import SnackBar from "../../ScreenComponent/common/SnackBar";
import CodeInput from "../../ScreenComponent/auth/CodeInput";
import { bold, light } from "../../assets/fonts";
import { primary, secondary } from "../../assets/colors";
import { fetchAPI } from "../../services";
var that;
export default class OTP_Code extends Component{
   
    constructor(props){
        super(props);
        this.state={
            code:"",
            loading: false,
        }
    }
    componentDidMount(){
        that = this
    }
    verifyCode = () => {
        Keyboard.dismiss()
        const {code} = this.state;
        const {email} = this.props.route.params;
        console.log(email,code);
        // if(code.length !== 4){
        //     return Toast.show({text1: "Kindly Enter Code of 4 digits"})
        // }
        // if(code == verification_code){
        //     return this.props.navigation.navigate("New_Password", {user})
        // }
        // return Toast.show({text1: "Invalid Code"})
        var data = new FormData();
        data.append('email', email);
        data.append('otp', code);
        console.log(email,code);
        fetchAPI('post', 'verify-otp', data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            that.setState({loading: false})
            if(response.data.message == "Otp successfully matched."){
                Toast.show({text1: response.data.message})
                this.props.navigation.navigate(
                    "New_Password",{email: email}
                )
            }else{
                return Toast.show({text1: response.data.message})
            }
        })
        .catch(function (error) {
            console.log(error);
            that.setState({loading: false})
            return Toast.show({text1: "Some Problem Occurred"})
        });
    }

    render(){
        const { loading } = this.state;
        const {user, verification_code,email} = this.props.route.params;
        console.log(email);
        return(
            <View style={styles.main}> 
                <ScrollView style={{flex:1, backgroundColor:primary }} contentContainerStyle={{alignItems:"center"}}  >
                    <Image source={require("../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("3%") }} />
                    <Text style={[styles.Txt, {letterSpacing:4, fontSize:hp("2.8%"), marginBottom:hp('0%')}]} > CODE </Text>
                    <Text style={[styles.Txt,{marginVertical:hp('0%'), fontSize:hp('2.5%')}]}>Verification code has been sent to your email, Kindly enter 4-digit code to verify your email.</Text>
                    <CodeInput
                        value={this.state.code}
                        setValue={(code)=>this.setState({code})}                         
                    />
                
                    <TouchableOpacity style={styles.btn} onPress={this.verifyCode} >
                        <Text style={[styles.Txt, {marginTop:0, fontSize:hp("2%")}]} >
                            NEXT
                        </Text>
                    </TouchableOpacity>
                    {loading &&
                        <ActivityIndicator 
                            style={{marginTop: hp('3%')}}
                            size={"large"}
                            color={secondary}
                        />
                    }
                </ScrollView>
                <SnackBar position="bottom" />
            </View>
                

        );
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:primary,
        padding:hp("1.5%"),
        // alignItems:"center"
    },
    Txt:{
        fontSize:hp("2.5%"),
        color:"white",
        fontFamily: light,
        marginTop:hp("5%"),
    },
    btn:{
        backgroundColor: secondary,
        width:"90%",
        height:hp("5%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp("3%"),
    },
    OuterStyle:{
        width:"50%",
        backgroundColor:"transparent",
        borderBottomColor:"white",
        borderBottomWidth:hp("0.5%"),
        marginTop:"3%",
       
    },
    InputStyle:{
        fontSize:hp("2.5%"),
        fontFamily: bold,
        color:"white",
        letterSpacing:5,
        // alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    }
});