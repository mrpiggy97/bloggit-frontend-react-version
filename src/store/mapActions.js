import { resolveUserCredentials, updatePosts } from './actions'

//mappers for actions
export const mapResolveUserCredentialsToProps = (dispatch) => {
    return {
        resolveUserCredentials(newState){
            dispatch(resolveUserCredentials(newState))
        }
    }
}

export const mapUpdatePostsToProps = (dispatch) => {
    return {
        updatePosts(url){
            dispatch(updatePosts(url))
        }
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        resolveUserCredentials(newState){
            dispatch(resolveUserCredentials(newState))
        },
        updatePosts(url){
            dispatch(updatePosts(url))
        }
    }
}

export default mapActionsToProps