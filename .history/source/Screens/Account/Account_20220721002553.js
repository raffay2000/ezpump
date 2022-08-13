import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { primary, white } from '../../assets/colors';
import { bold, regular, semiBold } from '../../assets/fonts';
import { connect } from 'react-redux';
// import { toTitleCase } from '../../utils';
import PointsBlock from '../../ScreenComponent/account/PointsBlock';
import AccountDetailText from '../../ScreenComponent/account/AccountDetailText';


const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? hp("3%") : hp("2%")) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? hp("6.5%") : hp("5.5%")) : hp("5.5%");
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


class Account extends Component{

    // state={
    // }
    // componentDidMount(){
    
    // }
    // renderNavBar = () => (
    //     <View style={styles.navContainer}>
    //         <View style={styles.statusBar} />
    //         <View style={styles.navBar}>
    //             <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
    //                 <Text style={{color: 'white'}}>About</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
    //                 <Text style={{color: 'white'}}>Me</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );

    renderContent = () => {
        const {user_type, description, phone_number, email, website, address, created_at, user_name, points} = this.props.user;
        return (
            <View style={styles.main} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    {user_type=="PUMP" &&
                        <PointsBlock points={points}/>
                    }
                    <AccountDetailText 
                        heading={"Username"}
                        text={user_name}
                    />
                    <AccountDetailText 
                        heading={"Description"}
                        text={description}
                    />
                    <AccountDetailText 
                        heading={"Phone"}
                        text={phone_number}
                    />
                    <AccountDetailText 
                        heading={"Address"}
                        text={address}
                    />
                    <AccountDetailText 
                        heading={"Email"}
                        text={email}
                    />
                    <AccountDetailText 
                        heading={"Website"}
                        text={website}
                    />
                    <AccountDetailText 
                        heading={"Join Date"}
                        text={created_at}
                    />

                    <Text style={styles.Heading} > My Reviews </Text>

                    <Reviews
                        NameTxt={"Kevin Pump Co ss."}
                        Review={"2.7"}
                        Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                    />

                    <Reviews
                        NameTxt={"Kevin Pump Co."}
                        Review={"2.7"}
                        Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                    />

                    <Reviews
                        NameTxt={"Kevin Pump Co."}
                        Review={"2.7"}
                        Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                    />

                    <Reviews
                        NameTxt={"Kevin Pump Co."}
                        Review={"2.7"}
                        Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                    />

                    <Reviews
                        NameTxt={"Kevin Pump Co."}
                        Review={"2.7"}
                        Review_Description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}
                    />

                    <View style={{height:hp("5%")}} />
                </ScrollView>
            </View>
        );
      };

    renderTitle = () => {
        const {company_name} = this.props.user;
        return (
            <>
                <Text style={styles.NameTxt} >{company_name}</Text>
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"center"}} >
                    <Text style={styles.RateTxt} >4.9/5</Text>
                    <FontAwesome name="star" color={"#BCD221"} size={hp("2.5%")} />
                </View>
            </>
        );
    };    

    renderImage(){
        const {cover_image} = this.props.user;

        if(cover_image){
            return {uri: cover_image}
        }else{
            return require("../../assets/images/coverimage2.png")
        }
    }
     
    render(){
        const {cover_image} = this.props.user;
        console.log(cover_image);
        return(
            <>
                <StatusBar barStyle="light-content" />
                <AppHeader 
                    Heading={"ACCOUNT"}
                    style={{zIndex:1}} 
                />
                <Text>Hello</Text>
                <Image source={{uri:`data:images/jpg;base64,${cover_image}`}} style={{height:50,width:50,zIndex:100}} />
                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={hp("28%")}
                    extraScrollHeight={20}
                    // navbarColor="#3498db"
                    navbarColor="#000000"
                    // titleStyle={styles.titleStyle}
                    title={this.renderTitle()}
                    backgroundImage={this.renderImage()}
                    backgroundImageScale={1.2}
                    // renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={styles.container1}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container1}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, null)(Account)

function Reviews({NameTxt,Review_Description, Review }){
    return(
        <View style={styles.Container} >
            <View style={styles.Top} >
                <Text style={[styles.Heading, {marginTop:0}]} > {NameTxt} </Text>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}  >
                    <Text style={[styles.RateTxt, {color:"#000000"}]} >{Review}</Text>
                    <FontAwesome name="star" color={"#BCD221"} size={hp("2.5%")} />
                </View>
            </View>
            <Text style={styles.Para} >
                {Review_Description}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#EEEEEE",
        padding:hp("2.5%"),
        paddingTop:0,
        paddingBottom:0
    },
    NameTxt:{
        fontSize:hp("2.2%"),
        fontFamily:bold,
        color:"#FFFFFF",
        letterSpacing:0.5,
    },
    RateTxt:{
        fontSize:hp("1.7%"),
        fontFamily:regular,
        color:"#FFFFFF",
        letterSpacing:0.5,
    },
    Heading:{
        fontSize:hp("2.2%"),
        fontFamily:semiBold,
        color:"#000000",
        letterSpacing:0.5,
        marginTop:hp("2%"),
    },
    Para:{
        fontSize:hp("1.8%"),
        fontFamily:regular,
        color:"#979797",
        letterSpacing:0.5,
        marginTop:hp("1.5%"),
        textAlign:'justify',
    },
    Container:{
        marginTop:hp("2%"),
        width:"100%",
        minHeight:hp("10%"),
        borderRadius:hp("1.2%"),
        backgroundColor:"#FFFFFF",
        shadowColor:"#00000029",
        shadowRadius:3,
        shadowOpacity:4,
        shadowOffset:{width:0, height:2},
        elevation:4,
        padding:hp("1.4%")
    },
    Top:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between",
    },
    /////////////////////////////////////////////////////////////
    container1: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
});