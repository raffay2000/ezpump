import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, white } from '../assets/colors';
import { bold, regular } from '../assets/fonts';
import Modal from './common/Modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.type_name }</Text>
                            <Icon name={"check-box-outline-blank"} color={black} size={25} />
                        </View>
                    )}
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: hp('2%'),
        width: wp('80%'),
        backgroundColor: white,
        borderRadius: hp('1%')
    },
    heading: {
        fontSize: hp('2%'),
        color: black,
        fontFamily: bold,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text:{
        fontSize: hp('1.85%'),
        color: black,
        fontFamily: regular,
    }
})