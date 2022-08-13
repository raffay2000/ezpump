import Toast from "react-native-toast-message"
import { navigate } from "../../navigation"
import { fetchAPI } from "../../services"
import {
    ADD_EDIT_PUMP,
    ADD_EDIT_PUMP_DONE,
    DELETE_PUMP,
    DELETE_PUMP_DONE,
    LOAD_PUMPS,
    LOAD_PUMPS_DONE
} from "../Constants"


export const loadPumps = () => {
    return function (dispatch) {
        dispatch({
            type: LOAD_PUMPS,
        });
        fetchAPI('get', 'pump/get-pumps', null, true)
        .then(function (response) {
            if(response.data.success){
                loadPumpsDone(dispatch, false, response.data.data)
            }else{
                loadPumpsDone(dispatch, true, response.data.data)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            loadPumpsDone(dispatch, true)
        });
    }
}

const loadPumpsDone = (dispatch, failed=false, pumps=[]) => {
    return dispatch({
        type: LOAD_PUMPS_DONE,
        pumps,
        failed,
    })
}

export const addEditPump = (pump_id, line, volume, stateValue, jobType, pumpType, availability, name, description) => {
    return function (dispatch, getState) {
        const pumps = getState().pumpReducer.pumps;
        dispatch({
            type: ADD_EDIT_PUMP
        })
        var data = new FormData();
        var url;
        if(pump_id){
            url = 'pump/edit-pump';
            data.append('pump_id', pump_id)
        }else{
            url = 'pump/create-pump';
        }
        data.append('line_length', line);
        data.append('m3', volume);
        data.append('state', stateValue);
        data.append('job_type_id', jobType);
        data.append('pump_type_id', pumpType);  
        data.append('monday', JSON.stringify(availability.monday));
        data.append('tuesday', JSON.stringify(availability.tuesday));
        data.append('wednesday', JSON.stringify(availability.wednesday));
        data.append('thursday', JSON.stringify(availability.thursday));
        data.append('friday', JSON.stringify(availability.friday));
        data.append('saturday', JSON.stringify(availability.saturday));
        data.append('sunday', JSON.stringify(availability.sunday));
        data.append('name', name);
        data.append('description', description);

        
        fetchAPI('post', url, data, true)
        .then(function (response) {
            Toast.show({text1: response.data.message})
            if(response.data.success){
                if(pump_id){

                }else{
                    console.log('pumps prev', pumps.length);
                    pumps.splice(0, 0, response.data.pump);
                    console.log('pumps after', pumps.length);
                    addEditPumpDone(dispatch, response.data.message, pumps)
                    navigate('App_Pumps')
                }
            }else{
                addEditPumpDone(dispatch, response.data.message, pumps)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            addEditPumpDone(dispatch, "Some Problem Occurred", pumps)
            console.log(error);
        });
    }
}
const addEditPumpDone = (dispatch, msg, pumps) => {
    Toast.show({text1: msg})
    return dispatch({
        type: ADD_EDIT_PUMP_DONE,
        pumps
    })
}


export const deletePump = (id) => {
    return function(dispatch, getState){
        dispatch({
            type: DELETE_PUMP
        });
        const pumps = getState().pumpReducer.pumps;
        console.log('prevPumps', pumps)

        fetchAPI('get', `pump/delete-pump/${id}`, null, true)
        .then(function (response) {
            if(response.data.success){
                const newPumps = pumps.filter(pump=>pump.id !== id);
                console.log('newPumps', newPumps)
                deletePumpDone(dispatch, response.data.message, newPumps);
                navigate('App_Pumps');
            }else{
                deletePumpDone(dispatch, response.data.message, pumps)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            deletePumpDone(dispatch, "Some Problem Occurred", pumps)
        });
        
    }
}

const deletePumpDone = (dispatch, message, pumps) => {
    Toast.show({text1: message});
    return dispatch({
        type: DELETE_PUMP_DONE,
        pumps,
    })
}