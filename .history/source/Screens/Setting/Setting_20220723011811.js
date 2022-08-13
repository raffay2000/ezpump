import React from 'react';

import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import AwesomeAlert from "react-native-awesome-alerts";
import { regular, semiBold } from '../../assets/fonts';
import { primary,  secondary, white } from '../../assets/colors';
import { removeAllItems } from '../../persist-storage';
import { AuthContext } from '../../context';
import { connect } from 'react-redux';
import TitleRow from '../../ScreenComponent/settings/TitleRow';
import SettingOption from '../../ScreenComponent/settings/SettingOption';
import { fetchAPI,getToken } from '../../services';
import Toast from 'react-native-toast-message';

 class Setting extends React. Component {
    state={
        showAlert:false
     }
    // componentDidMount(){
        
    // }
    Logout = async()=> {
        
        // this.props.navigation.navigate("Login")
        const token = await getToken();
        fetchAPI('get', 'logout',null,token)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            Toast.show({text1: response.data.message})
            if(response.data.message === "Successfully logged out"){
                Toast.show({text1: "Successfully logged out"})
                removeAllItems();
                this.context.updateState();
            }
            else{
                return Toast.show({text1: response.data.message})
            }
        })
        .catch(function (error) {
            console.log(error);
            Toast.show({text1: "Some Problem Occurred"})
        });
    }
    onItemPress = (route) => () => {
        this.props.navigation.navigate(route)
        
    }

     render(){
        const { showAlert } = this.state;
        const { name, type } = this.props.user;
        return(
            <>
                <AppHeader 
                    Heading={"SETTINGS"}
                    BorRadius={true}
                    IsBack={true}
                    style={{zIndex:1}} 
                    IsDisable={true}
                />
                <TitleRow title={name}/>
                <View style={styles.Container} >
                   <SettingOption text={"Account Settings"}  onPress={this.onItemPress('AccountSetting')} />
                   {type=="pump"  && <SettingOption text={"Buy Points"}  onPress={this.onItemPress("BuyPoints")} /> }
                   {/* <SettingOption text={"Payment Method"}  onPress={()=> this.props.navigation.navigate("SelectPay_Method")} /> */}
                   <SettingOption text={"Privacy & Policy"} onPress={this.onItemPress("PrivacyPolicy")} />
                   <SettingOption text={"Terms & Conditions"} onPress={this.onItemPress('Terms_Condition')} />
                   <SettingOption text={"Logout"} color={secondary} onPress={()=> this.setState({showAlert:true})} />
               </View>

               <AwesomeAlert 
                    show={showAlert}
                    // showProgress={true}
                    // progressColor={"red"}
                    // progressSize={25}
                    title='Confirm'
                    message="Are you sure you want to Logout?" 
                    titleStyle={{color: secondary}}
                    messageStyle={{ fontSize:hp("2.25%")}}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    showCancelButton={true}
                    confirmText="Yes"
                    onCancelPressed={()=> this.setState({showAlert: false})}
                    onConfirmPressed={this.Logout}
                    contentContainerStyle={{width:hp("100%") , height:hp("22%") , backgroundColor:"#FFFFFF"}}
                    confirmButtonColor={secondary}
                    cancelButtonColor="#979797"
                    cancelButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                    confirmButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                    confirmButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0}}
                    cancelButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF',letterSpacing:0}}
                />
    
            </>
        ); 
    }
    

     
}

const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, null)(Setting);



Setting.contextType = AuthContext;

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
    
    Container:{
        flex:1,
        backgroundColor:white,
        padding:hp("4%"),
        paddingTop:hp("3%")
    },
});
 