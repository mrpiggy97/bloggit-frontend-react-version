import { authenticateTokenInstance, withoutTokenInstance } from '../axiosInstances'

const getPosts = (page) => {

    const url = `/posts/?page=${page}`
    const method = "GET"
    const token = localStorage.getItem("bloggit_token")

    if(token){
        console.log(token)
        //api rest-framework-jwt package has a bug where
        //there has to be a waiting period for token to be accepted
        //after redirecting from authentication view to home view
        //in the frontend
        return authenticateTokenInstance({
            method: method,
            url: url,
        })
    }
    
    else{
        return withoutTokenInstance({
            method: method,
            url: url
        })
    }
}

export default getPosts