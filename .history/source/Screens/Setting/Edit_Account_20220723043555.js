import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Image,
    ScrollView,
    LogBox
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {launchImageLibrary} from "react-native-image-picker";
import { semiBold, regular } from '../../assets/fonts';
import { black, lightGray, primary, secondary, white } from '../../assets/colors';
import TitleRow from '../../ScreenComponent/settings/TitleRow';
import { connect } from 'react-redux';
import LabelInput from '../../ScreenComponent/common/LabelInput';
import { Button } from '../../ScreenComponent/common/Button';
import ImageLoader from '../../ScreenComponent/common/ImageLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL, fetchAPI, getToken } from '../../services';
import Toast from 'react-native-toast-message';
import SnackBar from '../../ScreenComponent/common/SnackBar';
import { setItem } from '../../persist-storage';
import { AuthContext } from '../../context';
var FormData = require('form-data');


var that;
 class Edit_Account extends React. Component {
   
    constructor(props){
        super(props);
        this.state = {
            name:"",
            description: '',
            coverImage: null,
            website: '',
            address: '',
            loading: false,
        }
    }

     componentDidMount(){
        that = this;
        const {name, description, website, address, cover_image} = this.props.user;
        // console.log(cover_image);
        this.setState({
            name,
            description,
            website,
            address,
            user_name,
            phone_number,
            email,
            coverImage: `${BASE_URL}${cover_image}`
        })
     }

    onEditPress=()=>{
        const token = getToken()
        Keyboard.dismiss();
        this.setState({loading: true})
        const {name, description, website, address, coverImage,email,phone_number,company_name,user_name} = this.state;
        var data = new FormData();
        data.append('email', email);
        data.append('phone_number', phone_number);
        data.append('company_name', name);
        data.append('user_name', user_name);
        data.append('address', address);
        data.append('description', description);
        data.append('website', website);
        if(coverImage !== this.props.user.cover_image){
            data.append('cover_image', {
                name: "image.jpg",
                type: "image/jpeg",
                uri:  Platform.OS === "android" ? coverImage : coverImage.replace("file://", "")
            });
        }

        fetchAPI('post', 'update-profile', data, token)
        .then(function (response) {
            Toast.show({text1: response.data.message});
            that.setState({loading: false})
            if(response.data.message == "User successfully updated."){
                setItem('user', JSON.stringify(response.data.user))
                that.context.updateState();
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            that.setState({loading: false})
            Toast.show({text1: "Some Problem Occurred"});
            console.log(error);
        });
        
        
    }
    selectImage = () => {
        launchImageLibrary({mediaType: 'photo', quality: 0.8}, (response) => {
            console.log('Response = ', response);
        
            const coverImage = response.assets[0].uri;
            this.setState({coverImage})
        });
    }
    renderImage() {
        const {coverImage} = this.state;
        if(!coverImage){
            return (
                <View style={[styles.image, {backgroundColor: lightGray, justifyContent: 'center'}]}>
                    <TouchableOpacity onPress={this.selectImage} style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="image"  size={44} color={secondary}/>
                        <Text style={{color: secondary, fontFamily: regular, fontSize: hp('1.95%'),  marginTop: hp('1%')}}>Add Image</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return (
                <View>
                    <Text onPress={this.selectImage} style={{position: 'absolute', color: secondary, right: 10, top: 10, fontSize: hp('2%'), fontFamily: regular, zIndex: 999}}>Edit</Text>
                    <ImageLoader
                        source= {{uri : coverImage}}
                        style={styles.image}
                    />
                </View>
            )
        }
    }

    render(){
        
        const {user} = this.props;
        const {email, phone_number, user_name,company_name,address} = user;
        const { description, coverImage, website, loading} = this.state;
        // console.log(user_name);
        return(
            <>
                <AppHeader 
                   Heading={"EDIT ACCOUNT"}
                   BorRadius={true}
                   IsBack={true}
                   style={{zIndex:1}} 
                   IsDisable={true}
                />
                <TitleRow title={user.name}/>
                <View style={styles.main} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {this.renderImage()}
                        <LabelInput
                            label={"Enter Email"}
                            value={email}
                            blur={false}
                            // editable={false}
                            placeholder={"Enter Email Here"}
                            onChange={(text)=>this.setState({email: text})}
                            onSubmitPress={()=>this.username.focus()}
                            inputStyle={{color: 'gray'}}
                            style={{marginTop: hp('2%')}}
                        />
                        <LabelInput
                            label={"Enter Username"}
                            value={user_name}
                            blur={false}
                            // editable={false}
                            placeholder={"Enter Username Here"}
                            onChange={(text)=>this.setState({username: text})}
                            inputRef={ref => this.username = ref}
                            onSubmitPress={()=>this.phone.focus()}
                            inputStyle={{color: 'gray'}}
                        />
                        <LabelInput
                            label={"Enter Phone Number"}
                            value={phone_number}
                            blur={false}
                            // editable={false}
                            placeholder={"Enter Phone Number Here"}
                            onChange={(text)=>this.setState({phone: text})}
                            inputRef={ref => this.phone = ref}
                            onSubmitPress={()=>this.address.focus()}
                            inputStyle={{color: 'gray'}}
                        />
                        <LabelInput
                            label={"Enter Name"}
                            value={company_name}
                            blur={false}
                            placeholder={"Enter Name Here"}
                            onChange={(text)=>this.setState({name: text})}


                            onSubmitPress={()=>this.address.focus()}
                        />
                        <LabelInput
                            label={"Enter Address"}
                            value={address}
                            blur={false}
                            placeholder={"Enter Address Here"}
                            onChange={(text)=>this.setState({address: text})}
                            inputRef={ref => this.address = ref}
                            onSubmitPress={()=>this.website.focus()}
                        />
                        <LabelInput
                            label={"Enter Website Address"}
                            value={website}
                            blur={false}
                            placeholder={"Enter Website Address Here"}
                            onChange={(text)=>this.setState({website: text})}
                            inputRef={ref => this.website = ref}
                            onSubmitPress={()=>this.description.focus()}
                        />
                        <LabelInput
                            label={"Enter Description"}
                            value={description}
                            blur={false}
                            placeholder={"Enter Description Here"}
                            onChange={(text)=>this.setState({description: text})}
                            inputRef={ref => this.description = ref}
                            // onSubmitPress={()=>this.description.focus()}
                            multiline={true}
                            inputStyle={{minHeight: hp('15%'),textAlignVertical: 'top'}}
                            style={{minHeight: hp('17.5%')}}

                        />
                        <Button 
                            color={'black'}
                            text={"Edit"}
                            loading={loading}
                            textColor={'white'}
                            style={{width: '100%', marginTop: '2%'}}
                            onPress={this.onEditPress}
                        />
                    </ScrollView>
                </View>
                <SnackBar position={'bottom'}/>
            </>
        ); 
     }   
 }

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

Edit_Account.contextType = AuthContext;

export default connect(mapStateToProps, null)(Edit_Account);

const styles = StyleSheet.create({ 
    image: {
        height: hp('20%'),
        width: '100%',

    },
    Top:{
        
    },
    Txt:{
        fontSize:hp("2.5%"),
        fontFamily:semiBold,
        lineHeight:hp("2.8%"),
        color:white,
        letterSpacing:0.5,
        marginTop:hp("1%")
    },
    main:{
        flex:1,
        padding:hp("2%"),
        backgroundColor:"white"
    },
    Heading:{
        fontSize:hp("2.5%"),
        fontFamily:semiBold,
        color:"gray",
        letterSpacing:0.5,
        // marginTop:hp("1%")
    },
    Container:{
        flexDirection:'row', 
        alignItems:"center", 
        justifyContent:"flex-start",
         marginTop:hp("3%")
        },
    Add:{
        height:hp("5%"), 
        width:hp("5%"), 
        backgroundColor:"lightgray",
        alignItems:"center", 
        justifyContent:"center",
        marginLeft:hp("1.5%")
    },
    InputStyle:{
        width:"100%",
        height:hp("5%"),
        borderBottomColor:"black",
        borderBottomWidth:hp("0.1%"),
        paddingLeft:hp("1%"),
        fontSize:hp("2.2%"),
        color:"black",
        fontFamily:semiBold,
        marginTop:hp("2%")
    },
    btn:{
        height:hp("5%"), 
        width:"50%", 
        backgroundColor:secondary,
        alignItems:"center", 
        justifyContent:"center",
        marginTop:hp("3%"),
        alignSelf:"center"
    }
});
 