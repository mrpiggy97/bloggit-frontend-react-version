import updatePosts from 'store/utils/updatePosts'


//these are the actions
export function resolveUserCredentials(newState){
    return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
}

//these is an async action
export function updatePosts(url){
    return { type : "UPDATE_POSTS", payload : updatePosts(url) }
}