import Authentication from './utils/Authentication'

const initialState = {
    logging : false,
    authenticated : window.localStorage.getItem('bloggit_token') ? true : false,
    username : window.localStorage.getItem('bloggit_username'),
    profilePic : window.localStorage.getItem('bloggit_profile_pic'),
    userCommunities : window.localStorage.getItem('bloggit_user_communities'),
    posts : [],
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : null,
    fetchingStatus : {
        success : null,
    },
}

//reducers are in essence getters for the app
const rootReducer = (state = initialState, { type, payload }) => {

    switch(type){

        case "LOGIN_PENDING":
            return { ...state, logging : true}
        
        case "LOGIN_FULFILLED":
            return { ...state, ...payload, logging : false }
        
        case "LOGIN_FAILED":
            return { ...state, logging : null }
        
        case "LOGOUT_PENDING":  
            return state
        
        case "LOGOUT_FULFILLED":
            return { ...state, ...payload }
        
        case "LOGOUT_FAILED":
            return state

        case "UPDATE_POSTS_PENDING":
            return { ...state, fetchingPosts : true }

        case "UPDATE_POSTS_FULFILLED":
            if(payload.authenticated === false){
                let newUserCredentials = Authentication.removeUserItemsFromStorage()
                return { ...state, ...payload, ...newUserCredentials, fetchingPosts : false }
            }
            return { ...state, ...payload, fetchingPosts : false }

        case "UPDATE_POSTS_FAILED":
            return { ...state, ...payload }

        default:
            return state
    }
}

export default rootReducer