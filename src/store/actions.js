import updatePosts from './utils/updatePosts'
import updateCommunityPosts from './utils/updateCommunityPosts'
import updateResults from './utils/updateResults'
import { Login, Register, Logout } from './utils/Authentication'


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
            type : "UPDATE_POSTS",
            payload : updateCommunityPosts(page, community)
        }
    },

    updateResults(page, query){
        return { type : "UPDATE_POSTS", payload : updateResults(page, query)}
    },

    login(username, password){
        return { type : "LOGIN", payload : Login(username, password) }
    },

    register(username, password1, password2){
        return { type : "LOGIN",  payload : Register(username, password1, password2) }
    },

    logout(){
        return { type : "LOGOUT", payload : Logout() }
    }
}


export default actions