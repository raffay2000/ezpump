import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { black, primary, secondary, white } from '../../assets/colors';
import { light, regular } from '../../assets/fonts';
import { register } from '../../Redux/Action/AuthAction';
import CodeInput from '../../ScreenComponent/auth/CodeInput';
import PhoneInput from '../../ScreenComponent/auth/PhoneInput';
import { Button } from '../../ScreenComponent/common/Button';
import Container from '../../ScreenComponent/common/Container';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import {verifyOtp} from "../../Redux/Action/AuthAction";
// import auth from "@react-native-firebase/auth"

class PhoneVerification extends Component{
    state={
        code: '',
        confirm:null,
    }
    // PhoneSignIn() {
    //     // If null, no SMS has been sent
      
    //     // Handle the button press
    //      signInWithPhoneNumber = async(phoneNumber)=> {
    //       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //       this.setState({confirm:confirmation});
    //     }
      
    //     async function confirmCode() {
    //       try {
    //         await confirm.confirm(code);
    //       } catch (error) {
    //         console.log('Invalid code.');
    //       }
    //     }
      
    //     if (!confirm) {
    //       return (
    //         <Button
    //           title="Phone Number Sign In"
    //           onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
    //         />
    //       );
    //     }
      
    //     return (
    //       <>
    //         <TextInput value={code} onChangeText={text => setCode(text)} />
    //         <Button title="Confirm Code" onPress={() => confirmCode()} />
    //       </>
    //     );
    //   }
    onSendCodePress = () => { 
        const {phone} = this.props;
        // send code on phone through firebase

    }
    onRegisterPress = async(code) => {
        await this.props.otp(code)
        return this.props.navigation.navigate('Login')
    }
    render(){
        const {code} = this.state;
        const {phone, loading} = this.props;
        return(
            <Container style={{backgroundColor: black}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={styles.image} source={require('../../assets/images/logo.png')} />
                    <Text style={styles.heading}>REGISTRATION</Text>
                    <Text style={styles.text}>Verification code will be sent on your email</Text>
                    <View style={styles.row}>
                        <PhoneInput
                            phone={phone}
                            // onChange={phone=> this.setState({phone})}
                            editable={false}
                        />
                        <Button
                            color="transparent"
                            text={"Send"}
                            textColor={white}
                            style={styles.button}
                            onPress={this.onSendCodePress}
                        />
                    </View>
                    <Text style={[styles.text,{marginTop:hp('10%')}]}>Enter code you received</Text>
                    <CodeInput
                        value={code}
                        setValue={(code)=>this.setState({code})}  
                        style={{marginTop:hp('2%'), width: hp('35%')}}                       
                    />
                    <Button
                        color={secondary}
                        text={"REGISTER"}
                        textColor={white}
                        loading={loading}
                        style={{marginTop:hp('5%'), alignSelf:'center'}}
                        onPress={this.onRegisterPress(code)}
                    />
                </ScrollView>
                <SnackBar position={"top"}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.registerLoading,
        // name: state.authReducer.name,
        // username: state.authReducer.username,
        // description: state.authReducer.description,
        // email: state.authReducer.email,
        phone: state.authReducer.phone,
        // password: state.authReducer.password,
        // userType: state.authReducer.userType,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        verifyOtp: (otp) => dispatch(verifyOtp(otp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);

const styles = StyleSheet.create({
    image:{
        alignSelf:'center',
        height: hp('27.5%'),
        width: hp('27.5%'),
        
    },
    heading: {
        fontSize:hp("2.5%"),
        color:"white",
        fontFamily:regular,
        textAlign: "center",
        letterSpacing: 5
    },
    text: {
        fontSize:hp("2%"),
        color:"white",
        fontFamily: light,
        // marginHorizontal: hp('2%'),
        marginTop: hp('3%'),
        textAlign: "center",
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: hp('3%'),
    },
    button:{
        borderWidth:1,
        borderColor: white,
        width:'25%',
    }
});
