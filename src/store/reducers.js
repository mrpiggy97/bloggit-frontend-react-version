import Authentication from './utils/Authentication'

const initialState = {
    authenticated : window.localStorage.getItem('bloggit_token') ? true : false,
    username : window.localStorage.getItem('bloggit_username'),
    profilePic : window.localStorage.getItem('bloggit_profile_pic'),
    userCommunities : window.localStorage.getItem('bloggit_user_communities'),
    posts : [],
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : false,
    fetchingStatus : {
        success : null,
        error : null
    },
    query : ""
}

//reducers are in essence getters for the app
const rootReducer = (state = initialState, { type, payload }) => {

    switch(type){
        case "RESOLVE_USER_CREDENTIALS":
            let auth = new Authentication(state, payload)
            //this methods just returns an object copy of state with
            //payload
            return auth.setAuthenticationState()

        case "UPDATE_POSTS_PENDING":
            return { ...state, fetchingPosts : true }

        case "UPDATE_POSTS_FULFILLED":
            if(payload.authenticated !== state.authenticated){
                let userPayload = Authentication.removeUserItemsFromStorage()
                return { ...state, ...payload, ...userPayload }
            }

            return { ...state, ...payload }

        case "UPDATE_POSTS_FAILED":
            return { ...state, ...payload }
        
        case "UPDATE_COMMUNITY_POSTS_PENDING":
            return { ...state, fetchingPosts : true }
        
        case "UPDATE_COMMUNITY_POSTS_FULFILLED":
            if(payload.authenticated !== state.authenticated){
                let userPayload = Authentication.removeUserItemsFromStorage()
                return { ...state, ...payload, ...userPayload }
            }

            return { ...state, ...payload }
        
        case "UPDATE_COMMUNITY_POSTS_FAILED":
            return { ...state, ...payload }

        default:
            return state
    }
}

export default rootReducer