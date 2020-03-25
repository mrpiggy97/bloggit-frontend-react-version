import updatePosts from './utils/updatePosts'
import updateCommunityPosts from './utils/updateCommunityPosts'


//these are the actions

const actions = {
    resolveUserCredentials(newState){
        return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
    },
    //these is an async action
    updatePosts(page){
        return { type : "UPDATE_POSTS", payload : updatePosts(page) }
    },

    updateCommunityPosts(page, community){
        return {
            type : "UPDATE_COMMUNITY_POSTS",
            payload : updateCommunityPosts(page, community)
        }
    }
}


export default actions