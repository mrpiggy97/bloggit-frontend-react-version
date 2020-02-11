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
        code : null
    }
}

//reducers are in essence getters for the app
const rootReducer = (state = initialState, { type, payload }) => {

    if(type === "RESOLVE_USER_CREDENTIALS"){
        let auth = new Authentication(state, payload)
        return auth.setAuthenticationState()
    }

    else if(type === "UPDATE_POSTS_PENDING"){
        //payload is supposed to be a url containing a page number to get that
        //page posts.
        //If user token has expired updatePosts will also remove said token,
        //in the same way auth.setAuthenticated would
        return Object.assign({}, state, { fetchingPosts : true} )
    }

    else if(type === "UPDATE_POSTS_FULFILLED"){
        if(payload.authenticated !== state.authenticated){
            Authentication.removeUserItemsFromStorage()
            payload.username = null
            payload.token = null
            payload.userCommunities = null
            payload.profilePic = null
        }
        return Object.assign({}, state, payload)
    }

    else if(type === "UPDATE_POSTS_FAILED"){
        return Object.assign({}, state, payload)
    }

    return state
}

export default rootReducer