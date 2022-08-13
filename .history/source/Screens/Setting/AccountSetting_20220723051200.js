import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import AwesomeAlert from 'react-native-awesome-alerts';
import { bold, regular, semiBold } from '../../assets/fonts';
import { primary, secondary, white } from '../../assets/colors';
import TitleRow from '../../ScreenComponent/settings/TitleRow';
import { connect } from 'react-redux';
import SettingOption from '../../ScreenComponent/settings/SettingOption';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import { fetchAPI, getToken } from '../../services';
import Toast from 'react-native-toast-message';
import { removeAllItems } from '../../persist-storage';
import { AuthContext } from '../../context';
var that;

 class AccountSetting extends React. Component {
    state={
        loading: false,
        showAlert:false,
        IsValue:false
    }
    componentDidMount(){
        that = this;
    }

    deactivateAccount = () => {
        this.setState({loading: true})
        const token = getToken();
        fetchAPI('get', 'update-status', null,token)
        .then(async function (response) {
            Toast.show({text1: response.data.message})
            that.setState({loading: true})
            if(response.data.message){
                Toast.show({text1: response.data.message})
                await removeAllItems();
                that.context.updateState();
            }else{
                Toast.show({text1: "Some thing went wrong"})
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            Toast.show({text1: "Some Problem Occurred"})
            that.setState({loading: false})
            console.log(error);
        });

    }

    setLocation = () => {
        this.setState({IsValue: !this.state.IsValue})
        // if(!this.state.IsValue){
        //     this.toast.show("Your Location Is On", 500)
        // }
        // else{
        //     this.toast.show("Your Location Is Off", 500)
        // }
        
    }

    render(){
        const {name} = this.props.user;
        const {showAlert, loading} = this.state;
        return(
            <>
               <AppHeader 
                   Heading={"ACCOUNT SETTING"}
                   BorRadius={true}
                   IsBack={true}
                   style={{zIndex:1}} 
                   IsDisable={true}
               />
               <TitleRow title={name}/>
               <View style={styles.Container} >
                   <SettingOption text={"Edit Account"} onPress={()=> this.props.navigation.navigate("Edit_Account")} />
                   <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%"}} >
                       <SettingOption text={"Location"}  onPress={()=>alert("Location")} />
                       <Switch 
                            value={this.state.IsValue} 
                            onChange={this.setLocation } 
                            thumbColor={this.state.IsValue ? secondary : "gray"} 
                            trackColor={{false:'lightgray', true:'lightgray'}}   
                            style={{marginTop:hp("2%")}}
                        />
                   </View>
                   <SettingOption text={"Change Password"}  onPress={()=> this.props.navigation.navigate("ChangePassword")} />
                   <SettingOption text={"DeActivate Account"} onPress={()=>this.setState({showAlert: true})} />
               </View>

               <AwesomeAlert 
                    show={showAlert}
                    showProgress={loading}
                    progressColor={secondary}
                    progressSize={25}
                    title={"Deactivate Account"}
                    message="Confirm if you want to deactivate your account, this action can not be undo"
                    titleStyle={{color: secondary}}
                    messageStyle={{ fontSize:hp("2.25%")}}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    showCancelButton={true}
                    confirmText="Yes"
                    onCancelPressed={()=> this.setState({showAlert: false})}
                    onConfirmPressed={this.deactivateAccount}
                    contentContainerStyle={{width:hp("100%") , height: loading ? hp("32%") : hp("28%") , backgroundColor:"#FFFFFF"}}
                    confirmButtonColor={secondary}
                    cancelButtonColor="#979797"
                    confirmButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF'}}
                    cancelButtonTextStyle={{fontFamily:regular,fontSize:hp("1.9%"),color:'#FFFFFF'}}
                    cancelButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                    confirmButtonStyle={{minWidth: hp('12%'),  alignItems: 'center'}}
                />
                <SnackBar position={'bottom'}/>
    
            </>
        ); 
    }
     
}

const mapStateToProps = state => {
    return{ 
        user: state.authReducer.user,
    }
}


AccountSetting.contextType = AuthContext;

export default connect(mapStateToProps, null)(AccountSetting);



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
    Btn_Txt:{
        fontSize:hp("1.9%"),
        fontFamily:regular ,
        lineHeight:hp("2%"),
        color:primary,
        letterSpacing:0.5,
        marginLeft:hp("2%")
    },
    Container:{
        flex:1,
        backgroundColor:white,
        padding:hp("4%"),
        paddingTop:hp("3%")
    },
    Comp:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:hp("1%"),
        // backgroundColor:"red",
        height:hp("5%")
    }
});
 