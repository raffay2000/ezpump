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
                const cancelledJobs = jobs.filter(job => job?.job_request[0]?.status == "cancelled")
                const inProcessJobs = jobs.filter(job => job?.job_request[0]?.status == "approved" && job.status == "in progress")
                const appliedJobs = jobs.filter(job => job.status == "pending" && job?.job_request[0]?.status == "applied")
                const rejectedJobs = jobs.filter(job => job?.job_request[0]?.status == "reject")
                dispatch({
                    type: LOAD_MY_JOBS_DONE,
                    failed: false,
                    // myJobs: jobs,
                    completed: completedJobs,
                    pending: pendingJobs,
                    cancelled: cancelledJobs,
                    inprocess: inProcessJobs,
                    applied: appliedJobs,
                    rejected: rejectedJobs,
                })
            }else{
                loadMyJobsDone(dispatch, true)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            loadMyJobsDone(dispatch, true)
            console.log(error);
        });

    }
}

const loadMyJobsDone = (dispatch, failed=false) => {
    return dispatch({
        type: LOAD_MY_JOBS_DONE,
        // myJobs: jobs,
        failed
    })
}