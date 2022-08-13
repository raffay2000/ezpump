import { 
    LOAD_PUMPS,
    LOAD_PUMPS_DONE,
    ADD_EDIT_PUMP,
    ADD_EDIT_PUMP_DONE,
    DELETE_PUMP,
    DELETE_PUMP_DONE,
    SHOW_DELETE_PUMP_ALERT,
} from "../Constants";


const initialState = {
    pumps: [],
    loading: false,
    actionLoading: false,
    failed: false,
    deleteLoading: false,
    deleteAlert: false
}

export default (state = initialState, action) => {
    const {type, pumps, failed} = action;
    switch (type) {
        case LOAD_PUMPS:
            return {...state, loading: true, failed: false}            
        case LOAD_PUMPS_DONE: 
            return {...state, loading: false, pumps, failed}
        case ADD_EDIT_PUMP:
            return {...state, actionLoading: true}            
        case ADD_EDIT_PUMP_DONE: 
            return {...state, actionLoading: false, pumps}
        case SHOW_DELETE_PUMP_ALERT:
            return {...state, deleteAlert: true}
        case DELETE_PUMP:
            return {...state, deleteLoading: true}
        case DELETE_PUMP_DONE: 
            return {...state, deleteLoading: false,  deleteAlert: false, pumps}
        default:
            return state;
    }
}