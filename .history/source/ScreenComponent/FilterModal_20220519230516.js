import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Modal from './common/Modal';

export default () => {
    return (
        <Modal
            isVisible={true}
        >
            <View style={styles.modalContainer}>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: hp('2%'),
        width: '80%',
        backgroundColor: white,
        borderRadius: hp('1%')
    },
    
})