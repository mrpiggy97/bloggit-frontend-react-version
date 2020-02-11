//setters for store

import updatePosts from 'store/utils/updatePosts'

const actions = {

    resolveUserCredentials(newState){
        return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
    },

    updatePosts(url){
        return { type : "UPDATE_POSTS", payload : updatePosts(url) }
    }
}

export const mapResolveUserCredentialsToProps = (dispatch) => {
    let action = actions.resolveUserCredentials
    return {
        resolveUserCredentials(newState){
            dispatch(action(newState))
        }
    }
}

export const mapUpdatePostsToProps = (dispatch) => {
    let action = actions.updatePosts
    return {
        updatePosts(url){
            dispatch(action(url))
        }
    }
}

const mapActionsToProps = (dispatch) => {

    const { resolveUserCredentials } = actions
    return {
        resolveUserCredentials(newState){
            dispatch(resolveUserCredentials(newState))
        }       
    }
}

export default mapActionsToProps