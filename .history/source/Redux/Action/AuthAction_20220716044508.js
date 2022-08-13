import { setItem } from "../../persist-storage";
import { fetchAPI } from "../../services";
import Toast from 'react-native-toast-message'
import { 
    LOGIN, 
    LOGIN_DONE,
    REGISTER,
    REGISTER_DONE,
    REGISTER_SUCCESS,
    REGISTER_STEP_ONE,
    REGISTER_STEP_ONE_DONE,
    REGISTER_STEP_TWO,
    REGISTER_STEP_TWO_DONE,
    SET_DESCRIPTION,
    SET_EMAIL,
    SET_NAME,
    SET_PASSWORD,
    SET_PHONE,
    SET_USERNAME,
    SET_USER_TYPE,
SET_IS_AGREE
} from "../Constants"
import FormData from "form-data";
import { navigate } from "../../navigation";


export const login = (email, password, context) => {

    var data = new FormData();
    data.append('email', email);
    data.append('password', password);

    // var data = JSON.stringify({
    //     email,
    //     password,
    // })
    return function(dispatch){
        dispatch({
            type: LOGIN
        });
        fetchAPI('post','login', data)
        .then((res)=>{
            console.log(res.data)
            if(res.data.success){
                loginDone(dispatch, "Login Successful", res.data.user);
                setItem("user", JSON.stringify(res.data.user));
                setItem("token", res.data.access_token);
                context.updateState();
            }else if(res.data.message == "Please verify the otp first."){
                loginDone(dispatch, res.data.message)
                navigate('VerifyOtp', {email})
            }else{
                loginDone(dispatch, res.data.message)
            }
        })
        .catch((error)=>{
            console.log(res)
            console.log(error)
            loginDone(dispatch, "Some Problem Occurred")
        })
        // return console.log(email, password, context)
    }
}
const loginDone = (dispatch, message, user, token) => {
    Toast.show({text1: message})
    dispatch({
        type: LOGIN_DONE,
        message,
        user,
        token
    })
}


export const register = () => {
    return function(dispatch, getState){
        const {email, password, phone, name, username, description, userType} = getState().authReducer;
        console.log(email, password, phone, name, username, description)
        dispatch({
            type: REGISTER
        });
        var data = new FormData();
        data.append('name', name);
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('description', description);
        data.append('phone', phone);
        data.append('type', userType ? "company" : "pump");

        fetchAPI('post', 'auth/register', data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            registerDone(dispatch, response.data.message)
            if(response.data.success){
                dispatch({type: REGISTER_SUCCESS})
                return navigate('Login')
            }else{
            }
        })
        .catch(function (error) {
            console.log(error);
            registerDone(dispatch, "Some Problem Occurred")
        });

    }
}

const registerDone = (dispatch, message) => {
    Toast.show({text1: message})
    return dispatch({
        type: REGISTER_DONE,
    })
}
export const registerStepOne = () => {
    return function(dispatch, getState){
        const {email, password, phone, userType} = getState().authReducer;
        console.log(email, password, phone, userType)
        dispatch({
            type: REGISTER_STEP_ONE
        });
        var data = new FormData();
        // data.append('name', name);
        // data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        // data.append('description', description);
        data.append('phone_number', phone);
        // data.append('type', userType ? "company" : "pump");

        fetchAPI('post', 'register-step-one', data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            registerStepOneDone(dispatch, response.data.message)
            if(response.data.success){
                dispatch({type: REGISTER_SUCCESS})
                return navigate('Register')
            }else{
            }
        })
        .catch(function (error) {
            console.log(error);
            registerStepOneDone(dispatch, "Some Problem Occurred")
        });

    }
}

const registerStepOneDone = (dispatch, message) => {
    Toast.show({text1: message})
    return dispatch({
        type: REGISTER_STEP_ONE_DONE,
    })
}
export const registerStepTwo = (website,ImgSrc,is_agree) => {
    return function(dispatch, getState){
        const {email, password, phone, userType,name,username,description} = getState().authReducer;
        // console.log(email, password, phone, userType,name,username,description,website,is_agree)
        console.log(ImgSrc)
        dispatch({
            type: REGISTER_STEP_TWO
        });
        var data = new FormData();
        data.append('user_type', userType ? "company" : "pump");
        data.append('company_name', name);
        data.append('user_name', username);
        data.append('email', email);
        data.append('password', password);
        data.append('phone_number', phone);
        data.append('cover_image', ImgSrc);
        data.append('description', description);
        data.append('website', website);
        data.append('is_agree', is_agree ? '1' : '0');


        fetchAPI('post', 'register-step-two', data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            registerStepTwoDone(dispatch, response.data.message)
            if(response.data.message == "User successfully created."){
                dispatch({type: REGISTER_SUCCESS})
                registerStepTwoDone(dispatch, "User Created Successfully")
                return navigate('PhoneVerification')
            }else if(response.data.error){
                registerStepTwoDone(dispatch, response.error.company_name[0])
            }
        })
        .catch(function (error) {
            console.log(error);
            registerStepTwoDone(dispatch, "Some Problem Occurred")
        });

    }
}

const registerStepTwoDone = (dispatch, message) => {
    Toast.show({text1: message})
    return dispatch({
        type: REGISTER_STEP_TWO_DONE,
    })
}
export const verifyOtp = (otp) => {
    return function(dispatch, getState){
        const {email} = getState().authReducer;
        // console.log(email, password, phone, userType,name,username,description,website,is_agree)
        dispatch({
            type: REGISTER_STEP_TWO
        });
        var data = new FormData();
        
        data.append('email', email);
        data.append('otp', otp);


        fetchAPI('post', 'verify-otp', data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            verifyOtpDone(dispatch, response.data.message)
            if(response.data.message == "Otp successfully matched."){
                dispatch({type: REGISTER_SUCCESS})
                verifyOtpDone(dispatch, "OTP Matched")
                return navigate('Login')
            }else if(response.data.error){
                verifyOtpDone(dispatch, response.error)
            }
        })
        .catch(function (error) {
            console.log(error);
            verifyOtpDone(dispatch, "Some Problem Occurred")
        });

    }
}

const verifyOtpDone = (dispatch, message) => {
    Toast.show({text1: message})
    return dispatch({
        type: REGISTER_STEP_TWO_DONE,
    })
}


export const toggleUserType = (userType) => {
    return{
        type: SET_USER_TYPE,
        userType: !userType
    }
}


export const setEmail = (email) => {
    return{
        type: SET_EMAIL,
        email
    }
}
export const setName = (name) => {
    return{
        type: SET_NAME,
        name
    }
}
export const setPhone = (phone) => {
    return{
        type: SET_PHONE,
        phone
    }
}
export const setUsername = (username) => {
    return{
        type: SET_USERNAME,
        username
    }
}
export const setPassword = (password) => {
    return{
        type: SET_PASSWORD,
        password
    }
}
export const setDescription = (description) => {
    return{
        type: SET_DESCRIPTION,
        description
    }
}
export const setIsAgree = (condition) => {
    return{
        type: SET_IS_AGREE,
        condition
    }
}
