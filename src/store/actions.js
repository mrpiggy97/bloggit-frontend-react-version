//setters for store
const resolveUserCredentials = (newState) => {
    return { type: "RESOLVE_USER_CREDENTIALS", payload : newState }
}

const updateQuery = (newState) => {
    return { type : "UPDATE_QUERY", payload : newState }
}

const mapActionsToProps = (dispatch) => {
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