import actions from './actions'

//mappers for actions
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
        updatePosts(page){
            dispatch(action(page))
        }
    }
}

export const mapUpdateCommunityPostsToProps = (dispatch) => {
    let action = actions.updateCommunityPosts
    return {
        updateCommunityPosts(page, community){
            dispatch(action(page, community))
        }
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        resolveUserCredentials(newState){
            dispatch(actions.resolveUserCredentials(newState))
        },

        updatePosts(page){
            dispatch(actions.updatePosts(page))
        },

        updateCommunityPosts(page, community){
            dispatch(actions.updateCommunityPosts(page, community))
        }
    }
}

export default mapActionsToProps