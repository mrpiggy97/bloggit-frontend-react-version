import updatePosts from 'store/utils/updatePosts'


//these are the actions

const actions = {
    resolveUserCredentials(newState){
        return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
    },
    //these is an async action
    updatePosts(url){
        return { type : "UPDATE_POSTS", payload : updatePosts(url) }
    }    
}


export default actions