import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default ({onBackPress, style, isVisible, children}) => {
    return(
        <Modal
            onBackdropPress={onBackPress}
            avoidKeyboard
            onBackButtonPress={onBackPress}
            testID={'modal'}
            isVisible={isVisible}
            onSwipeComplete={onBackPress}
            swipeDirection={['down']}
            propagateSwipe={true}
            style={[styles.modal,style]}
            backdropTransitionOutTiming={0}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
        >
            
            {/* <View style={[style]}> */}
                {children}
            {/* </View> */}
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center'
    },
})