import Authentication from './utils/Authentication'

const initialState = {
    authenticated : window.localStorage.getItem('bloggit_token') ? true : false,
    username : window.localStorage.getItem('bloggit_username'),
    profilePic : window.localStorage.getItem('bloggit_profile_pic'),
    userCommunities : window.localStorage.getItem('bloggit_user_communities'),
    query : ''
}

//reducers are in essence getters for the app
const rootReducer = (state = initialState, { type, payload }) => {

    if(type === "RESOLVE_USER_CREDENTIALS"){
        let auth = new Authentication(state, payload)
        return auth.setAuthenticationState()
    }

    else if(type === "UPDATE_QUERY"){
        return Object.assign({}, state, { query : payload })
    }

    return state
}

export default rootReducer