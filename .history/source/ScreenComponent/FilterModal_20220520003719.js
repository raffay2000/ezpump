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
import { bold } from '../assets/fonts';
import Modal from './common/Modal';

export default ({heading, onBackPress, isVisible, value, data,}) => {
    console.log)data
    return (
        <Modal
            isVisible={isVisible}
            onBackPress={onBackPress}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.heading}>SELECT {heading.toUpperCase()}</Text>
                <ScrollView>
                    {data.map(item=>
                        <View>
                            <Text>{item.text}</Text>
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
    }
})