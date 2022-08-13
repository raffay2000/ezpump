import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { black, darkGray, white } from '../../assets/colors';
import { bold, regular } from '../../assets/fonts';

export default ({pump, job, state, name}) => {
    return(
        <TouchableOpacity style={styles.container}>
            <Text style={styles.heading}>{name}</Text>
            <View style={styles.row}>
                <Icon name="truck" color={"gray"}/>
                <Text style={styles.text}>Pump Type - {pump}</Text>
            </View>
            <View style={styles.row}>
                <Icon2 name="briefcase" color={"gray"}/>
                <Text style={styles.text}>Job Type - {job}</Text>
            </View>
            <View style={styles.row}>
                <Icon style={{padding: hp('1%'), backgroundColor: 'lightgray', borderRadius: 100}} name="world" color={"gray"}/>
                <Text style={styles.text}>State - {job}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:white,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: hp('3%'),
        marginVertical:hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: hp('1%')
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('0.5%')
    },
    heading: {
        fontSize: hp('2.25%'),
        color: black,
        fontFamily: bold
    },
    text: {
        fontSize: hp('2%'),
        color: 'gray',
        fontFamily: regular,
        marginLeft: hp('1.5%')
    }
})