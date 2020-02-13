import { authenticateTokenInstance, withoutTokenInstance } from '../axiosInstances'

const getPosts = (page) => {
    if(window.localStorage.getItem('bloggit_token')){
        return authenticateTokenInstance({
            method: 'get',
            url: `posts/?page=${page}`,
        })
    }
    else{
        return withoutTokenInstance({
            method: 'get',
            url: `posts/?page=${page}`
        })
    }
}

export default getPosts