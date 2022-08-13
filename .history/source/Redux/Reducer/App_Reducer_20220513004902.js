import {
    ScreenType,
    LOAD_JOB_AND_PUMP_TYPES
} from "../Constants";

const initialState = {
    ScreenType:"",
    job_types: {},
    pumpTypes: {},
}

const App_Reducer = (state=initialState, action) => {
    switch (action.type) {
        case ScreenType:
            return { ...state, ScreenType:action.payload }
        case LOAD_JOB_AND_PUMP_TYPES:
            return {...state, jobTypes: action.job_types, pumpTypes: action.pump_types, }
        default:
            return state
    }
}

export default App_Reducer;