import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {InputComponent} from "../../ScreenComponent/TextInput";
import Toast from "react-native-toast-message";
import SnackBar from "../../ScreenComponent/common/SnackBar";
import { light } from "../../assets/fonts";
import { primary, secondary } from "../../assets/colors";
import { connect } from "react-redux";
import { setDescription, setName, setUsername } from "../../Redux/Action/AuthAction";
import ImagePicker from 'react-native-image-picker';
 class Register extends Component{
   
    constructor(props){
        super(props);
        this.state={
            ImageSource:"",
            // username:"",
            // CompanyName:"",
            // Description:""
        }
    }
    
    Register_Now = () => {
        const {username, name, description} = this.props;
        if(
            username == "" ||
            name == "" ||
            description == ""
        ){
           
            // this.toast.show("Please fill all fields first", 1000)
            Toast.show({text1: "Please fill all fields"})
        }
        else{
            this.props.navigation.navigate("PhoneVerification")
        }
    }
    Select_Img = ()=>{
        const options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
              console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
              this.setState(ImageSource(response.uri))
            }
          });
    }
    

    render(){
        const {username, name, description} = this.props;
        return(
           <ScrollView style={{flex:1, backgroundColor:primary, padding:hp("2%") }} >
                <View style={styles.main}> 
                    <Image source={require("../../assets/images/logo.png")} style={{width:hp("25%"), height:hp("20%"), marginTop:hp("7%") }} />
                    <Text style={[styles.Txt, {letterSpacing:4, fontSize:hp("2.8%"), alignSelf:"center", lineHeight:hp("3%")}]} > REGISTRATION </Text>
                    <Text style={styles.Txt}> User name </Text>
                    <InputComponent
                        value={username}
                        OnChangeText={(text)=> this.props.setUsername(text)}
                        otherProps= {{ 
                            placeholder:"Enter Username",
                            onSubmitEditing: () => this.NextInput.focus(), 
                            blurOnSubmit:false 
                        }}
                        mainstyle={{marginTop:hp("1%")}}
                    />
                     <Text style={styles.Txt}> Company Name </Text>
                    <InputComponent
                        value={name}
                        OnChangeText={(text)=> this.props.setName(text)}
                        otherProps= {{
                            placeholder:"Enter Company Name",
                            ref:ref=> {this.NextInput = ref;}, 
                            onSubmitEditing: ()=> this.NextInput1.focus(),
                            blurOnSubmit:false 
                        }}
                        mainstyle={{marginTop:hp("1%")}}
                    />
                    <Text style={styles.Txt}> Select Cover Image </Text>
                    <TouchableOpacity style={styles.btn} onPress={this.Select_Img} >
                        <Text style={[styles.Txt, {marginTop:0 , alignSelf:"flex-start", fontSize:hp("2.6%"), lineHeight:hp("2.8%"),color:"#000",paddingLeft:12}]} >
                            {this.state.ImageSource == "" ? "Select Image" : "Change Image"}
                        </Text>
                    </TouchableOpacity>
                     <Text style={styles.Txt}> Description </Text>
                     <InputComponent
                        value={description}
                        OnChangeText={(text)=> this.props.setDescription(text)}
                        otherProps= {{ 
                            secureTextEntry:true, 
                            placeholder:"Enter Description", 
                            multiline:true,
                            ref:ref=> {this.NextInput1 = ref;}, 
                        }}
                        mainstyle={{marginTop:hp("1%"),height:hp("25%")}}
                        style={{height:hp("25%")}}
                    />
                    <TouchableOpacity style={styles.btn} onPress={this.Register_Now} >
                    {/* <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate("App_Route", {Type:"Comapny"})} > */}
                        <Text style={[styles.Txt, {marginTop:0 , alignSelf:"center", fontSize:hp("2.6%"), lineHeight:hp("2.8%")}]} >
                            FINISH
                        </Text>
                    </TouchableOpacity>
                    <View style={{height:hp("3%")}} />
                    <SnackBar position="bottom"/>
                </View>
           </ScrollView>

        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.authReducer.name,
        username: state.authReducer.username,
        description: state.authReducer.description,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setName: (text) => dispatch(setName(text)),
        setUsername: (text) => dispatch(setUsername(text)),
        setDescription: (text) => dispatch(setDescription(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:primary,
        padding:hp("1.5%"),
        alignItems:"center"
    },
    Txt:{
        fontSize:hp("1.5%"),
        color:"white",
        lineHeight:hp("1.6%"),
        fontFamily:light,
        marginTop:hp("2%"),
        alignSelf:"flex-start"
    },
    btn:{
        backgroundColor: "#fff",
        width:"100%",
        height:hp("6%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp("3%")
    }
});