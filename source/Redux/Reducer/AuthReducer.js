import {
    LOGIN,
    LOGIN_DONE,
    REGISTER_STEP_ONE,
    REGISTER_STEP_ONE_DONE,
    REGISTER_STEP_TWO,
    REGISTER_STEP_TWO_DONE,
    REGISTER_SUCCESS,
    PUT_USER_DATA,

} from "../Constants";


const initialState = {
    user: {},
    token: "",
    loading: false,
    registerLoading: false,
}

export default (state = initialState, action) => {
    const {
        type,
        token,
        user,
    } = action;
    switch (type) {
        case LOGIN:
            return {
                ...state, loading: true
            }
        case LOGIN_DONE:
            return {
                ...state, loading: false, token, user
            }
        case REGISTER_STEP_ONE:
            return {
                ...state, registerLoading: true
            }
        case REGISTER_STEP_ONE_DONE:
            return {
                ...state, registerLoading: false
            }
        case REGISTER_STEP_TWO:
            return {
                ...state, registerLoading: true
            }
        case REGISTER_STEP_TWO_DONE:
            return {
                ...state, registerLoading: false
            }
        case PUT_USER_DATA:
            return {
                ...state, user, token
            }
        default:
            return state;
    }
}