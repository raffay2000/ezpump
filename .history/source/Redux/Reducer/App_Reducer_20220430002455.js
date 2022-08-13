import {
    ScreenType
} from "../Constants";

const initialState = {
        ScreenType:""
}

const App_Reducer = (state=initialState, action) => {
        switch (action.type) {
            case ScreenType:
                return { ...state, ScreenType:action.payload }

            default:
                return state
        }
}

export default App_Reducer;