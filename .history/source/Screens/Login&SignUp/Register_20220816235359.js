import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {InputComponent} from "../../ScreenComponent/TextInput";
import Toast from "react-native-toast-message";
import SnackBar from "../../ScreenComponent/common/SnackBar";
import { light } from "../../assets/fonts";
import { primary, secondary } from "../../assets/colors";
import { connect } from "react-redux";
import { setDescription, setName, setUsername,registerStepTwo,setPhone,setEmail,setPassword,setWebsite,toggleUserType,setIsCheck } from "../../Redux/Action/AuthAction";
import {launchImageLibrary} from 'react-native-image-picker';
import AutoComplete from "../../ScreenComponent/common/AutoComplete";

 class Register extends Component{
   
    constructor(props){
        super(props);
        this.state={
            ImageSource:"",
            website_name:"",
            error:false,
            region:{
                latitude: 37.80000,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            desp:"",
            // username:"",
            // CompanyName:"",
            // Description:""
        }

    }
    
    Register_Now = async() => {
        const {username, name, description} = this.props;
        const {ImageSource} = this.state;
        if(
            username == "" ||
            name == "" ||
            description == ""||
            ImageSource == ""
            ){
                this.setState({error:true})
                Toast.show({text1: "Please fill all fields"})
            }
            else{
                await this.props.registerStepTwo(ImageSource);
            try {
                console.log("Api Is Hitting");
                } catch (error) {
                    console.log(error);
                }
                    
            
        }
    }
    
    Select_Img = ()=>{
        const options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            includeBase64: true,
          };

          launchImageLibrary(options, async(response) => {
            if (response.errorCode) {
              console.log('LaunchImageLibrary Error: ', response.errorMessage);
            }else if(response.didCancel){
                console.log("User Cancelled")
            }
            else {
                console.log(response)
                let source1 = response.assets[0].base64;
                let source2 = `data:image/png;base64,${source1}`;
                // console.log(source2)
              this.setState({ImageSource:source2})
              
            }
          });
    }

    render(){
        const {username, name, description,website} = this.props;
        // const [region, setRegion] = useState({
        //     latitude: 37.80000,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        // })
        const setRegion = (region) => {
            this.setState({region})
        }
        const setdesp = (desp) => {
            this.setState({desp})
        }
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
                    {this.state.error ? !username?<Text style={{color:"red",alignSelf:"flex-start"}}>Enter Username</Text>: null:null}
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
                    {this.state.error ? !name?<Text style={{color:"red",alignSelf:"flex-start"}}>Enter Company name</Text>: null:null}
                    <Text style={styles.Txt}>WebSite Name</Text>
                    <InputComponent
                        value={website}
                        OnChangeText={(text)=> this.props.setWebsite(text)}
                        otherProps= {{
                            placeholder:"Website Name",
                            ref:ref=> {this.NextInput = ref;}, 
                            onSubmitEditing: ()=> this.NextInput1.focus(),
                            blurOnSubmit:false 
                        }}
                        mainstyle={{marginTop:hp("1%")}}
                    />
                    {/* {this.state.error ? !this.state.website_name?<Text style={{color:"red",alignSelf:"flex-start"}}>Enter Website</Text>: null:null} */}
                    <Text style={styles.Txt}> Select Cover Image </Text>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:"#fff"}]} onPress={this.Select_Img}>
                        <Text style={[styles.Txt, {marginTop:0 , alignSelf:"flex-start", fontSize:hp("2.6%"), lineHeight:hp("2.8%"),color:"#000",paddingLeft:12,}]} >
                            {this.state.ImageSource == "" ? "Select Image" : `Change Image`}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.Txt}>Address</Text>
                    <AutoComplete
                    // placeholder={this.state.desp}
                    desp={this.state.desp}
                    setdesp={()=>this.setState({desp:this.state.desp})}
                    region={this.state.region} 
                    setRegion={()=>setRegion({region:this.state.region})}/>
                    <View style={{alignSelf:"flex-start",marginTop:10}}>
                    {
                        this.state.ImageSource != "" ? (<Image source={{uri:this.state.ImageSource}} style={{height:50,width:50}} />) : null
                    }
                     </View>
                     {this.state.error ? !this.state.ImageSource?<Text style={{color:"red",alignSelf:"flex-start"}}>Add Image</Text>: null:null}
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
                    {this.state.error ? !description?<Text style={{color:"red",alignSelf:"flex-start"}}>Enter Description</Text>: null:null}
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
        name: state.globalReducer.name,
        username: state.globalReducer.username,
        description: state.globalReducer.description,
        website: state.globalReducer.website,
        phone: state.globalReducer.phone,
        email: state.globalReducer.email,
        password: state.globalReducer.password,
        userType: state.globalReducer.userType,
        isCheck: state.globalReducer.isCheck,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setName: (text) => dispatch(setName(text)),
        setUsername: (text) => dispatch(setUsername(text)),
        setDescription: (text) => dispatch(setDescription(text)),
        setPhone: (text) => dispatch(setPhone(text)),
        setEmail: (text) => dispatch(setEmail(text)),
        setPassword: (text) => dispatch(setPassword(text)),
        setWebsite: (text) => dispatch(setWebsite(text)),
        toggleUserType: (text) => dispatch(toggleUserType(text)),
        setIsCheck: (text) => dispatch(setIsCheck(text)),
        registerStepTwo: (ImageSource) => dispatch(registerStepTwo(ImageSource)),

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
        backgroundColor: secondary,
        width:"100%",
        height:hp("6%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp("3%")
    }
});