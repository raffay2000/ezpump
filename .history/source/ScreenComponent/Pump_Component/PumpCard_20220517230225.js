import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import { white } from '../../assets/colors';

export default () => {
    return(
        <TouchableOpacity style={styles.container}>
            <Text></Text>
            <View>
                <Icon name="truck" color={"gray"}/>
                <Text></Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:white,
        paddingVertical: hp('2%'),
        paddingHorizontal: hp('3%'),
    }
})