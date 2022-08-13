import {
    SCREEN_TYPE,
    PUT_USER_DATA,
    PUT_USER_TOKEN,
    LOAD_JOB_AND_PUMP_TYPES,
} from "../Constants";

export const ScreenTypeChange = (text) => {
    return{
        type: SCREEN_TYPE,
        payload: text
    }
}

export const putUserIntoState = (user) => {
    return{
        type: PUT_USER_DATA,
        payload: user
    }
}

export const putTokenIntoState = (token) => {
    return{
        type: PUT_USER_TOKEN,
        payload: token
    }
}


export const getJobAndPumpTypes = () => {

    return function(dispatch){

    }
}