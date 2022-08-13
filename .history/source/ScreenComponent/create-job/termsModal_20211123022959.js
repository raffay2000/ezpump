import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { primary, white } from '../../assets/colors';
import {Button} from '../common/Button';

const TermsModal = ({visible, onPress, onBackPress}) => {
    return(
        <Modal
            style={styles.modal}
            isVisible={visible}
            onBackButtonPress={onBackPress}
            onBackdropPress={onBackPress}
        >
            <View style={styles.container}>
                <Icon style={{alignSelf:'flex-end'}} name="close" size={20} color="black" onPress={onBackPress} />
                <Text>TERMS & CONDITIONS</Text>
                <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Button
                    color={primary}
                    text={"ACCEPT"}
                    textColor={white}
                    onPress={onPress}
                    style={{width: '50%', alignSelf: 'center', marginTop: hp('2%')}}
                />
            </View>
        </Modal>
    )
}
export default TermsModal;

const styles = StyleSheet.create({
    modal: {
        margin:0,
        // flex:1,
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center',
        
    },
    container:{
        margin: hp('3%'),
        padding: hp('2%'),
        backgroundColor:white,
        borderRadius:hp('2%'),
    }
})