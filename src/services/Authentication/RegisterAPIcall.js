import axios from 'axios'

let BASE_URL = process.env.REACT_APP_BLOGGIT_API_URL
export default function RegisterAPIcall(username, password1, password2){
    
    let url = `${BASE_URL}/register/`
    return axios({
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
            'accept' : 'application/json'
        },
        url : url,
        data : JSON.stringify({
            username : username,
            password1 : password1,
            password2 : password2,
        }),
        timeout : 5000
    })
}