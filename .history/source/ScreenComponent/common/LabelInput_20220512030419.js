import React, {useRef} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, gray, primary } from '../../assets/colors';
import { regular } from '../../assets/fonts';

const LabelInput = ({style, editable, labelStyle, inputStyle, label, onChange, value, placeholder, inputRef, onSubmitPress, blur, keyboard, ...rest}) => {
    const input = useRef(null);
    return(
        <View style={[styles.inputBox,style]}>
            <Text style={[styles.label,labelStyle]}>{label}</Text>
            <TextInput
                editable={editable}
                blurOnSubmit={blur}
                onChangeText={onChange}
                value={value}
                style={[styles.input,inputStyle, !editable && {color: gray}]}
                placeholder={placeholder}
                placeholderTextColor={gray}
                ref={inputRef}
                onSubmitEditing={onSubmitPress}
                keyboardType={keyboard ? keyboard : "default"}
                // keyboardType="ph"
                {...rest}
            />
        </View>
    )
}

export default LabelInput

const styles = StyleSheet.create({
    inputBox:{
        // alignItems:'center',
        marginBottom:hp('2%'),
    },
    label:{
        flex:1,
        fontSize:hp('2.2%'),
        color:black,
        fontFamily:regular
    },
    input:{
        // flex:2.2,
        height:hp('6%'),
        fontSize:hp('2.2%'),
        color:black,
        fontFamily:regular,
        borderWidth:1,
        borderBottomColor:primary,
        paddingHorizontal: hp('1%'),
        borderRadius: hp('1%'),
        marginTop: hp('1%'),
        
    },
})