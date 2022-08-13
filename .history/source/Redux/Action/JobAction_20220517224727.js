import { fetchAPI } from '../../services';
import { CREATE_JOB, CREATE_JOB_DONE } from '../Constants';


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