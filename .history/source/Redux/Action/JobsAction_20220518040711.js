import { fetchAPI } from "../../services";
import { LOAD_MY_JOBS, LOAD_MY_JOBS_DONE } from "../Constants";


export const loadMyJobs = () => {
    return function (dispatch){
        dispatch({
            type: LOAD_MY_JOBS
        })
        fetchAPI('get', 'job/get-user-jobs', null, true)
        .then(function (response) {
            if(response.data.success){
                const jobs = response.data.data;
                const completedJobs = jobs.filter(job => job.status == "completed")
                const pendingJobs = jobs.filter(job => job.status == "pending")
                const cancelledJobs = jobs.filter(job => job.status == "cancelled")
                const inProcessJobs = jobs.filter(job => job.status == "inprocess")
                dispatch({
                    type: LOAD_MY_JOBS_DONE,
                    failed: false,
                    completedJobs: completedJobs,
                    pendingJobs: pendingJobs,
                    cancelled: cancelledJobs,
                    inprocessJobs: inProcessJobs,
                })
            }else{
                loadMyJobsDone(dispatch, [], true)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            loadMyJobsDone(dispatch, [], true)
            console.log(error);
        });

    }
}

const loadMyJobsDone = (dispatch, jobs, failed=false) => {
    return dispatch({
        type: LOAD_MY_JOBS_DONE,
        myJobs: jobs,
        failed
    })
}