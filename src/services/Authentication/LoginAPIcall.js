import axios from 'axios'

let BASE_API_URL = process.env.REACT_APP_BLOGGIT_API_URL

export default function LoginAPIcall(username, password){

    let url = `${BASE_API_URL}/rest-auth/login/`
    return axios({
        method : "POST",
        headers : {
            'Content-type' : 'application/json',
            'accept' : 'application/json'
        },
        url : url,
        body : JSON.stringify({ username : username,  password : password }),
        timeout : 5000
    })
}