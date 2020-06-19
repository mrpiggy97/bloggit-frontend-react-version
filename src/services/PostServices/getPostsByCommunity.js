import { withoutTokenInstance, authenticateTokenInstance } from '../axiosInstances'

function getPostsByCommunity(page, community){
    let url = `/posts/posts-by-community/${community}/${page}/`
    let method = 'GET'
    if(window.localStorage.getItem('bloggit_token')){
        return authenticateTokenInstance({
            method : method,
            url : url
        })
    }
    else{
        return withoutTokenInstance({
            method : method,
            url : url
        })
    }
}

export default getPostsByCommunity