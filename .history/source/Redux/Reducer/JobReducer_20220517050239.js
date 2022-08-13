import { CREATE_JOB, CREATE_JOB_DONE } from "../Constants";


const initialState = {
    loading: false,
}

export default (state=initialState, action) => {
    const {type} = action;
    switch (type) {
        case CREATE_JOB:
            return {...state, loading: true}
        case CREATE_JOB_DONE:
            return {...state, loading: false}
    
        default:
            return state;
    }
}