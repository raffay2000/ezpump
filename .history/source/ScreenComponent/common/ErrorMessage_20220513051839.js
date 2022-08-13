import React from 'react';
import { 
    View,
    Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { lightGray } from '../../assets/colors';
import { regular } from '../../assets/fonts';

export default ({text}) => (
    <Text
        style={{
            fontFamily: regular,
            fontSize: hp('2.25%'),
            color: lightGray,
            textAlign: 'center'
        }}
    >
        {text}
    </Text>
)