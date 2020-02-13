import actions from './actions'

//mappers for actions
export const mapResolveUserCredentialsToProps = (dispatch) => {
    return {
        resolveUserCredentials(newState){
            let action = actions.resolveUserCredentials
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

const mapActionsToProps = (dispatch) => {
    return{
        resolveUserCredentials(newState){
            dispatch(actions.resolveUserCredentials(newState))
        },
        updatePosts(page){
            dispatch(actions.updatePosts(page))
        }
    }
}

export default mapActionsToProps