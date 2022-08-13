import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, white } from '../assets/colors';
import { bold } from '../assets/fonts';
import Modal from './common/Modal';

export default ({heading, onBackPress, isVisible, value, data,}) => {
    return (
        <Modal
            isVisible={isVisible || true}
            onBackPress={onBackPress}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.heading}>{heading.toUpperCase()}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        // padding: hp('2%'),
        minHeight: hp('10%'),
        width: '80%',
        backgroundColor: white,
        borderRadius: hp('1%')
    },
    heading: {
        fontSize: hp('2%'),
        color: black,
        fontFamily: bold,
    }
})