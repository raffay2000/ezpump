import { fetchAPI } from '../../services';
import { CREATE_JOB, CREATE_JOB_DONE, JOB_FILTER_CHANGE } from '../Constants';

export const changeJobsFilter = (jobsFilter) => {
    return {
        type: JOB_FILTER_CHANGE,
        jobsFilter
    }
}

export const createJob = (state,jobType, pumpType, line, volume, desc, add1, add2, map, date, time, priceFrom, priceTo) => {
    return function (dispatch, getState){

        dispatch({
            type: CREATE_JOB,
        })

    }
}

const createJobDone = (dispatch, msg) => {
    return dispatch({
        type: CREATE_JOB_DONE
    })
}