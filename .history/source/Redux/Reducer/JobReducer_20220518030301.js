import { CREATE_JOB, CREATE_JOB_DONE, LOAD_MY_JOBS, LOAD_MY_JOBS_DONE } from "../Constants";


const initialState = {
    loading: false,
    myJobs: [],
}

export default (state=initialState, action) => {
    const {type, myJobs} = action;
    switch (type) {
        case CREATE_JOB:
            return {...state, loading: true}
        case CREATE_JOB_DONE:
            return {...state, loading: false}

        case LOAD_MY_JOBS:
            return {...state, loading: true}
        case LOAD_MY_JOBS_DONE: 
            return {...state, loading: false, myJobs}
        default:
            return state;
    }
}