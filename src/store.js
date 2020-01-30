const initialState = {
    authenticated: window.localStorage.getItem('bloggit_token') ? true : false
}

//reducers are in essence getters
const rootReducer = (state = initialState, action) => {
    if(action.type === "CHANGE_STATE"){
        return Object.assign({}, state, { authenticated: action.payload })
    }

    return state
}

export const mapAuthenticatedToProps = (state) => {
    return { authenticated: state.authenticated}
}

export const setAuthenticated = (payload) => {
    return { type: "CHANGE_STATE", payload: payload }

}

export default rootReducer