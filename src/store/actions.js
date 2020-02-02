//setters for store

const actions = {

    resolveUserCredentials(newState){
        return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
    },

    updateQuery(newState){
        return { type : "UPDATE_QUERY", payload : newState }
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

export const mapUpdateQueryToProps = (dispatch) => {
    let action = actions.updateQuery
    return {
        updateQuery(newState){
            dispatch(action(newState))
        }
    }
}

const mapActionsToProps = (dispatch) => {

    const { resolveUserCredentials, updateQuery } = actions
    return {
        resolveUserCredentials(newState){
            dispatch(resolveUserCredentials(newState))
        },

        updateQuery(newState){
            dispatch(updateQuery(newState))
        }        
    }
}

export default mapActionsToProps