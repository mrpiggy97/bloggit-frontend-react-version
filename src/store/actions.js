import updatePosts from './utils/updatePosts'
import updateCommunityPosts from './utils/updateCommunityPosts'
import updateResults from './utils/updateResults'


//all actions should be wrapped inside actions const

const actions = {
    resolveUserCredentials(newState){
        return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
    },

    //these are async actions
    updatePosts(page){
        return { type : "UPDATE_POSTS", payload : updatePosts(page) }
    },

    updateCommunityPosts(page, community){
        return {
            type : "UPDATE_COMMUNITY_POSTS",
            payload : updateCommunityPosts(page, community)
        }
    },

    updateResults(page, query){
        return { type : "UPDATE_POSTS", payload : updateResults(page, query)}
    }
}


export default actions