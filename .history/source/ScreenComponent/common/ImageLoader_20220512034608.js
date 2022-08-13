import React,{useState} from 'react';
import {
    View,
    Image
} from 'react-native';
import LottieView from 'lottie-react-native';

const ImageLoader = (props) => {
    const [isLoaded,setIsLoaded] = useState(false)
    return(
        <View>
            {isLoaded && (
                props.profile
                    ?
                    <Image style={[props.style,{position:'absolute'}]}  source={require('../../assets/images/profile.png')}/>
                    :
                    <LottieView resizeMode="center" style={[props.style,{position:'absolute', top: '50%'}]} source={require('../../assets/animation/loader.json')} autoPlay loop />
                )
            }
            <Image
                style={props.style} 
                source={props.source == "" ? null : props.source}
                onLoad={()=>setIsLoaded(true)}
            />
        </View>
    )
}
export default ImageLoader;