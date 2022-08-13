import React,{useState} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import LottieView from 'lottie-react-native';
import { black, lightGray, secondary, white } from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { regular } from '../../assets/fonts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ImageLoader = (props) => {
    const [isLoaded,setIsLoaded] = useState(false)
    
    return(
        <View>
            {!isLoaded && (
                props.profile
                    ?
                    <Image style={[props.style,{position:'absolute'}]}  source={require('../../assets/images/profile.png')}/>
                    :
                    <LottieView resizeMode="center" style={[props.style,{position:'absolute',}]} source={require('../../assets/animation/loader.json')} autoPlay loop />
                )
            }
            <Image
                style={[props.style, !isLoaded && {backgroundColor: lightGray}]} 
                source={props.source == "" ? null : props.source}
                onLoad={()=>setIsLoaded(true)}
            />
        </View>
    )
}
export default ImageLoader;