import axios from 'axios'

let BASE_API_URL = process.env.REACT_APP_BLOGGIT_API_URL

export default function LogoutAPIcall(){
    let url = `${BASE_API_URL}/rest-auth/logout`
    return axios({
        method : "POST",
        headers : {
            'Authorization' : `JWT ${localStorage.getItem("bloggit_token")}`
        },
        url : url,
        body : null,
        timeout : 5000
    })
}