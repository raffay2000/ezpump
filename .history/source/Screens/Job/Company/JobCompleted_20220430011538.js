import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppHeader from '../../../ScreenComponent/AppHeader';
import {useNavigation} from "@react-navigation/native";
import { regular, semiBold } from '../../../assets/fonts';
 
 function JobCompleted(params) {
    
    const navigation = useNavigation();
    
    return(
        <>
            <AppHeader 
                IsBack={true}
                borderRadius
                Heading="JOB COMPLETION"
            />
            <View style={styles.main} >
                <Text style={styles.Txt} >
                    Congratulations This Job has been Completed
                </Text>

                <View style={{width:"100%", height:hp("0.1%"), marginTop:hp("6%"), marginBottom:hp("4%") , backgroundColor:"#00000029"}} />

                {/* <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%")}]} >
                    Please select the payment method
                </Text> */}

                <View style={styles.Btn_Container} >
                    <TouchableOpacity style={styles.Btn} onPress={()=> navigation.navigate("Comapny_Review")} >
                        <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%"), color:"#FFFFFF"}]} >Pay $5</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.Btn} onPress={()=> navigation.navigate("PaymentForm",{type:'company'})} >
                        <Text style={[styles.Txt, {fontFamily:regular, fontSize:hp("1.8%"), color:"#FFFFFF"}]} >Credit</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </>
     );
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:hp("2.5%"),
         backgroundColor:"#FFFFFF"
     },
     Btn_Container:{
         width:"100%",
         flexDirection:"row",
         alignItems:"center",
        //  justifyContent:'space-between',
         justifyContent:'center',
         marginTop:hp("4%")
     },
     Btn:{
         width:"40%",
         height:hp("5%"),
         alignItems:"center",
         justifyContent:"center",
         backgroundColor:"#FF4040",
         borderRadius:hp("1.2%"),
     },
     Txt:{
        fontSize:hp("2.2%"),
        fontFamily:semiBold,
        lineHeight:hp("2.5%"),
        color:"#1E202B",
        letterSpacing:1,
     }
 });

 export default JobCompleted;