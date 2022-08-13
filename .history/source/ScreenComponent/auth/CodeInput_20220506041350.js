import React from 'react';
import { 
    Text,
    StyleSheet
 } from 'react-native';
 import {
    CodeField,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { primary, secondary, white } from '../../assets/colors';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CodeInput = ({value, setValue, style}) => {
    
    const ref = useBlurOnFulfill({value, cellCount: 6});

    return(
        <CodeField
            ref={ref}
            // {...otherProps}
            caretHidden={false}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={[styles.root,style]}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            placeholder='0000'
            clearTextOnFocus
            renderCell={({index, symbol, isFocused}) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    // onLayout={getCellOnLayoutHandler(index)}
                >
                    {symbol}
                </Text>
            )}
        />
    )
};

export default CodeInput;

const styles = StyleSheet.create({
    cell: {
        width: hp('5.5%'),
        height: hp('6.5'),
        textAlign: 'center',
        padding:hp('0.5%'),
        backgroundColor:'black',
        fontSize:hp('4%'),
        borderBottomWidth:1.5,
        borderColor:secondary,
        color:white
    },
    focusCell:{
        borderColor:white,
    },
    root: {
        width:hp('25%'),
        alignSelf:'center'
    },
})