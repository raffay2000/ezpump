import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primary, secondary } from '../../assets/colors';
import { regular } from '../../assets/fonts';

export default ({text, onPress, color}) => (
    <TouchableOpacity 
        activeOpacity={0.4}
        onPress={onPress}
        style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"flex-start",
            marginTop:hp("1%"),
            // backgroundColor:"red",
            height:hp("5%")
        }}
    >
        <View 
            style={{
                width:8,
                height:8,
                borderRadius:100,
                backgroundColor:secondary
            }}
        />
        <Text 
            style={{
                color,
                fontSize:hp("1.9%"),
                fontFamily:regular,
                lineHeight:hp("2%"),
                color:primary,
                letterSpacing:0.5,
                marginLeft:hp("2%")
            }}
        > {text} </Text>
    </TouchableOpacity>
)

Comp:{
    
}