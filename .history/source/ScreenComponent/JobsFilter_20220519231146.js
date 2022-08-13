import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { regular } from '../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({FilterName, Type, OtherStyle}) => {
    return(
        <TouchableOpacity style={styles.container} >
            <View style={styles.row} >
                <Text style={[styles.TopTxt]} > {FilterName} </Text>
                <AntDesign name="caretdown" color="white" size={hp("1.5%")} style={{marginBottom:2}} />
            </View>
            <Text style={[styles.TopTxt, {alignSelf:"center"}]} > {Type} </Text>
        </TouchableOpacity>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:"100%",
        // paddingTop:hp("1.5%"),
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:hp("1%")
    },
    TopTxt:{
        fontSize:hp("1.6%"),
        fontFamily:regular,
        color:"#FFFFFF",
    },
})