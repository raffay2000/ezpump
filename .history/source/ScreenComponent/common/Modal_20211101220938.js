import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ModalComp extends React.PureComponent{
   
    render(){
        return(
            <Modal
                onBackdropPress={this.props.onBackPress}
                avoidKeyboard
                onBackButtonPress={this.props.onBackPress}
                testID={'modal'}
                isVisible={this.props.isVisible}
                onSwipeComplete={this.props.onBackPress}
                swipeDirection={['down']}
                propagateSwipe={true}
                style={[styles.modal,this.props.style]}
                backdropTransitionOutTiming={0}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
            >
                
                {/* <View style={[this.props.style]}> */}
                    {this.props.children}
                {/* </View> */}
            </Modal>
        )
    }
    
}
export default ModalComp

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center'
    },
})