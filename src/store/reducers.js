import removeUserCredentials from './utils/removeUserCredentials'
import setUserCredentials from './utils/setUserCredentials'

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

        if(payload.authenticated){
            //will set credentials in localStorage and return the object
            //that will be the new state
            return setUserCredentials(state, payload)
        }

        else{
            //will remove credentials from local stroage and return the object
            //that will be the new state
            return removeUserCredentials(state)
        }
    }

    else if(type === "UPDATE_QUERY"){
        return Object.assign({}, state, { query : payload })
    }

    return state
}

export default rootReducer