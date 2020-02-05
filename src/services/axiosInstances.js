import axios from 'axios'

const BASE_API_URL = process.env.REACT_APP_BLOGGIT_API_URL
export const authenticateTokenInstance = axios.create({
    baseURL: BASE_API_URL,
    headers:{
        Authorization: `JWT ${window.localStorage.getItem('bloggit_token')}`
    },
    timeout: 5000
})

export const CreateModifyInstance = axios.create({
    baseURL: BASE_API_URL,
    headers:{
        Authorization: `JWT ${window.localStorage.getItem('bloggit_token')}`,
        'Content-type': 'application/json',
        'accept': 'application/json'
    },
    timeout: 5000
})

export const withoutTokenInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000
})