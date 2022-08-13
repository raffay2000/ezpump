import React, { useState, useEffect} from 'react';

import { 
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LogBox,
    Text,
 } from 'react-native';
 import DropDownPicker from 'react-native-dropdown-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import { regular, semiBold } from '../assets/fonts';
import { toTitleCase } from '../utils';


function DropDownComponent({label, data, style, selectedValue, onChange}) {

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."])
    }, [])

    return(
        <View style={[styles.PickerViewStyle, style]}>
            <Text 
            style={{
                    flex:2,
                    color:'#979797',
                    fontSize:hp("1.75%"),
                    fontFamily: regular,
                }}
            > 
                {label}
            </Text>
            <Picker
                style={styles.pickerStyle}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                        onChange(itemValue)
                    }
                }
            >   
                <Picker.Item label={'Select'} value={0} />
                {data.map(item=><Picker.Item label={toTitleCase(item.label || item.type_name || item.name)} value={item.value || item.id} />)}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    PickerViewStyle:{
        marginTop:hp("2%"),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:hp('2%'),
        height:hp('5.5%'), 
        marginTop:hp("2%"), 
        backgroundColor:"white",
        borderRadius:hp('0.8%'), 
    },
    pickerStyle:{
        width: hp('35%'),
        fontSize:hp("2%"),
        fontFamily:semiBold,
        color:"black",
    }
});

export default DropDownComponent;