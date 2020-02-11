import { authenticateTokenInstance, withoutTokenInstance } from '../axiosInstances'

const getPosts = (url) => {
    if(window.localStorage.getItem('bloggit_token')){
        return authenticateTokenInstance({
            method: 'get',
            url: url,
        })
    }
    else{
        return withoutTokenInstance({
            method: 'get',
            url: url
        })
    }
}

export default getPosts