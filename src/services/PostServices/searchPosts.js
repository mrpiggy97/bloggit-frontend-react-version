import { authenticateTokenInstance, withoutTokenInstance } from '../axiosInstances'

function searchPosts(page, query){
    let instance = localStorage.getItem("bloggit_token") ? authenticateTokenInstance : withoutTokenInstance
    return instance({
        method : "GET",
        url : `/posts/search/${query}/`,
        body : null,
    })
}

export default searchPosts