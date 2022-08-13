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
    SET_DESCRIPTION,
    SET_EMAIL,
    SET_NAME,
    SET_PASSWORD,
    SET_PHONE,
    SET_USERNAME,
    SET_USER_TYPE,

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
        fetchAPI('post', 'auth/login', data)
        .then((res)=>{
            console.log(res.data)
            if(res.data.success){
                loginDone(dispatch, "Login Successful", res.data.user);
                setItem("user", JSON.stringify(res.data.user));
                setItem("token", res.data.token);
                context.updateState();
            }else{
                loginDone(dispatch, res.data.message)
            }
        })
        .catch((error)=>{
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