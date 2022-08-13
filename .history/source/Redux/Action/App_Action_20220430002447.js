import {
    ScreenType
} from "../Constants";

export const ScreenTypeChange = (text) => {
    return{
        type:ScreenType,
        payload:text
    }
}
