import axios from "axios";
import { getItem } from "../persist-storage";

// export const BASE_URL = "http://192.168.88.96:80";
// export const BASE_URL = "https://webdesignpreviews.com/custom/ezpump/public";
export const BASE_URL = "http://ezpump.webdesignpreviews.com";

// export const BASE_URL = "http://127.0.0.1:8000";

export const getToken = async () => {
    return await getItem("token");
}

export const getUser = async () => {
    return await getItem("user").then(user=>JSON.parse(user));      
}

export const fetchAPI = async (method, api, data, token=null, params=null) => {
    // return await fetch(`${BASE_URL}/api/${api}`, {
    //     method,
    //     body: data,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    var config = {
        method,
        url: `${BASE_URL}/api/${api}`,
        headers:{
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        data,
        params
    }
    if(token) config.headers.Authorization = 'Bearer '+await getToken()
    console.log(token)
    console.log(config)
    return await axios(config);
}