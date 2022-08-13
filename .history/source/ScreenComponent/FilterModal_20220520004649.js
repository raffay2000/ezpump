import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, secondary, white } from '../assets/colors';
import { bold, regular } from '../assets/fonts';
import Modal from './common/Modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './common/Button';

export default ({heading, onBackPress, isVisible, value, data,}) => {
    console.log(data)
    return (
        <Modal
            isVisible={isVisible}
            onBackPress={onBackPress}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.heading}>SELECT {heading.toUpperCase()}</Text>
                <ScrollView>
                    {data.map(item=>
                        <TouchableOpacity onPress={null} style={styles.row}>
                            <Text style={styles.text}>{item.type_name }</Text>
                            <Icon name={"radio-button-unchecked"} color={black} size={20} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
                <Button
                    color={secondary}
                    text={"Submit"}
                    textColor="white"
                    style={{width: '35%', alignSelf: 'center', height: hp('5%')}}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: hp('2.25%'),
        // paddingHo: hp('2%'),
        width: wp('80%'),
        backgroundColor: white,
        borderRadius: hp('1%')
    },
    heading: {
        fontSize: hp('2%'),
        color: secondary,
        fontFamily: bold,
        marginBottom: hp('2%')
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%')
    },
    text:{
        fontSize: hp('1.85%'),
        color: black,
        fontFamily: regular,
    }
})