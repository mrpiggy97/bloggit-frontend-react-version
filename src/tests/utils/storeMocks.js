import configStore from 'redux-mock-store'
import promise from 'redux-promise-middleware'


const middlewares = [promise]
const createStore = configStore(middlewares)

export const authenticatedStore = {
    authenticated : true,
    username : 'testinguser123',
    profilePic : null,
    userCommunities : ["test", "test2"],
    posts : [],
    query : "",
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : false,
    fetchingStatus : {
        success : null,
        code : null
    },
}

export const unauthenticatedStore = {
    authenticated : false,
    username : null,
    profilePic : null,
    userCommunities : null,
    posts : [],
    query : "",
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : false,
    fetchingStatus : {
        success : null,
        code : null
    },
}

export default createStore