import {
    ScreenType
} from "../AppConstants";

export const ScreenTypeChange = (text) => {
    return{
        type:ScreenType,
        payload:text
    }
}
