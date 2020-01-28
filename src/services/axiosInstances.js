import axios from 'axios'

export const authenticateTokenInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        Authorization: `JWT ${window.localStorage.getItem('bloggit_token')}`
    },
    timeout: 5000
})

export const CreateModifyInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        Authorization: `JWT ${window.localStorage.getItem('bloggit_token')}`,
        'Content-type': 'application/json',
        'accept': 'application/json'
    },
    timeout: 5000
})

export const withoutTokenInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000
})