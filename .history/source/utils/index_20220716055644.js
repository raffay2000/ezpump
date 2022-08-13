
export const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

export const phoneValidation = (phone) => {
    if(phone.match(/^\d+$/)){
        if(phone.length == 10 || phone.length == 11){
            return true;                
        }else{
           return false;
        }
    }else{
        return false;
    }
}
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const checkErrorField = (key, object) => {
    if(key in object){
        return object.key[0];
    }
    return '';
}


export const formatDate = (date, time) => {
    if(date!=="" && time!==""){
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    }
    if(date !== "" && time == ""){
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }
    if(date == "" && time !== ""){
        return `${time.getHours()}:${time.getMinutes()}`;
    }

    return ""
    // return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}