import { CREATE_JOB, CREATE_JOB_DONE, JOB_FILTER_CHANGE, LOAD_MY_JOBS, LOAD_MY_JOBS_DONE } from "../Constants";


const initialState = {
    loading: false,
    failed: false,
    myJobs: [],
    pending: [],
    inprocess: [],
    completed: [],
    cancelled: [],

    jobsFilter: {
        distance: {id: '', type_name: ''},
        pumpType: {id: '', type_name: ''},
        jobType: {id: '', type_name: ''}
    }
}

export default (state=initialState, action) => {
    const {type, pending, inprocess, completed, cancelled, failed, jobsFilter} = action;
    switch (type) {
        case CREATE_JOB:
            return {...state, loading: true}    
        case CREATE_JOB_DONE:
            return {...state, loading: false}

        case LOAD_MY_JOBS:
            return {...state, loading: true}
        case LOAD_MY_JOBS_DONE: 
            return {...state, loading: false, pending, inprocess, completed, cancelled, failed}
        case JOB_FILTER_CHANGE:
            return {...state, jobsFilter}
        default:
            return state;
    }
}