import { 
    LOAD_PUMPS,
    LOAD_PUMPS_DONE,
    ADD_EDIT_PUMP,
    ADD_EDIT_PUMP_DONE,
} from "../Constants";


const initialState = {
    pumps: [],
    loading: false,
    addEditLoading: false,
}

export default (state = initialState, action) => {
    const {type, pumps} = action;
    switch (type) {
        case LOAD_PUMPS:
            return {...state, loading: true}            
        case LOAD_PUMPS_DONE: 
            return {...state, loading: false, pumps}
        case ADD_EDIT_PUMP:
            return {...state, addEditLoading: true}            
        case ADD_EDIT_PUMP_DONE: 
            return {...state, addEditLoading: false, pumps}
        default:
            return state;
    }
}