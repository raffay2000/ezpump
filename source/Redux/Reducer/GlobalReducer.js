import {
    SET_EMAIL,
    SET_PHONE,
    SET_NAME,
    SET_USERNAME,
    SET_DESCRIPTION,
    SET_ADDRESS,
    SET_LAT,
    SET_LNG,
    SET_PASSWORD,
    SET_USER_TYPE,
    SET_WEBSITE,
    SET_IS_CHECK,

} from "../Constants";

const initialState = {
    registerLoading: false,
    email: "",
    password: "",
    phone: "",
    username: "",
    name: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
    userType: true, // true for company false for pump
    isCheck: false,
    website: "",
}
export default (state = initialState, action) => {
    const {
        type,
        email,
        password,
        phone,
        description,
        address,
        lat,
        lng,
        name,
        username,
        userType,
        isCheck,
        website
    } = action;
    switch (type) {
        case SET_EMAIL:
            return {
                ...state, email
            }
        case SET_DESCRIPTION:
            return {
                ...state, description
            }
        case SET_ADDRESS:
            return {
                ...state, address
            }
        case SET_LAT:
            return {
                ...state, lat
            }
        case SET_LNG:
            return {
                ...state, lng
            }
        case SET_PHONE:
            return {
                ...state, phone
            }
        case SET_PASSWORD:
            return {
                ...state, password
            }
        case SET_NAME:
            return {
                ...state, name
            }
        case SET_USERNAME:
            return {
                ...state, username
            }
        case SET_USER_TYPE:
            return {
                ...state, userType
            }

        case SET_WEBSITE:
            return {
                ...state, website
            }
        case SET_IS_CHECK:
            return {
                ...state, isCheck
            }
        default:
            return state;
    }
}