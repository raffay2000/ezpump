import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const TermsModal = ({visible, onPress, onBackPress, children}) => {
    return(
        <Modal
            style={styles.modal}
            isVisible={visible}
            onBackButtonPress={onBackPress}
            onBackdropPress={onBackPress}
        >
            {children}
        </Modal>
    )
}
export default TermsModal;

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center'
    },
})