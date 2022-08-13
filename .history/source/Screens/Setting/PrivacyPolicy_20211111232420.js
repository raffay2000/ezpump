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
import { Secondary, White } from '../../ScreenComponent/color';
import { SemiBold } from '../../ScreenComponent/Fonts';

 class PrivacyPolicy extends React.Component {
    state={
        company:null,
     }
     componentDidMount(){
        AsyncStorage.getItem('Type',(err, data)=>{
            if(data == "Company"){
                this.setState({company:true})
            }else{
                this.setState({company:false})
            }
        })
     }
     Logout = async()=> {
        await AsyncStorage.clear()
        this.props.navigation.navigate("Login")
        
    }
     render(){
        return(
            <>
               <AppHeader 
                   Heading={"PRIVACY POLICY"}
                   BorRadius={true}
                   IsBack={true}
                   style={{zIndex:1}} 
                   IsDisable={true}
               />
               <View style={styles.Top} >
                   <Text style={styles.Txt} > {this.state.company ? "John's Construction" : "Kevin Pump Co."} </Text>
               </View>
               <View style={styles.Container} >
                  <Text> Privacy Policy </Text>
               </View>
            </>
        ); 
     }
}

const styles = StyleSheet.create({
    Top:{
        width:"100%",
        height:hp("10%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Secondary,
        marginTop:hp("-2%"),
    },
    Txt:{
        fontSize:hp("2.5%"),
        fontFamily:SemiBold,
        lineHeight:hp("2.8%"),
        color:White,
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
    Container:{
        flex:1,
        backgroundColor:White,
        padding:hp("4%"),
        paddingTop:hp("3%")
    },
    
});
 
 export default PrivacyPolicy;