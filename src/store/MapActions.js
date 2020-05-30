import actions from './actions'


export class DispatchActions{
    constructor(dispatcher){
        this.actions = actions
        this.dispatcher = dispatcher
    }

    dispatchUpdatePosts(page){
        let action = this.actions.updatePosts
        this.dispatcher(action(page))
    }

    dispatchUpdateCommunityPosts(page, community){
        let action = this.actions.updateCommunityPosts
        this.dispatcher(action(page, community))
    }

    dispatchResolveUserCredentials(newState){
        let action = actions.resolveUserCredentials
        this.dispatcher(action(newState))
    }

    dispatchUpdateResults(page, query){
        let action = actions.updateResults
        this.dispatcher(action(page, query))
    }

    dispatchLogin(username, password){
        let action = actions.login
        this.dispatcher(action(username, password))
    }

    dispatchRegister(username, password1, password2){
        let action = actions.register
        this.dispatcher(action(username, password1, password2))
    }

    dispatchLogout(){
        let action = actions.logout
        this.dispatcher(action())
    }
}

export default class MapActions{
    //views
    RenderPostsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            updatePosts(page){
                ActionDispatchers.dispatchUpdatePosts(page)
            },

            updateCommunityPosts(page, community){
                ActionDispatchers.dispatchUpdateCommunityPosts(page, community)
            },

            updateResults(page, query){
                ActionDispatchers.dispatchUpdateResults(page, query)
            }
        }
    }

    AuthenticationToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            login(username, password){
                ActionDispatchers.dispatchLogin(username, password)
            },
            registerUser(username, password1, password2){
                ActionDispatchers.dispatchRegister(username, password1, password2)
            }
        }
    }

    //components
    PostInfoActionsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            resolveUserCredentials(newState){
                ActionDispatchers.dispatchResolveUserCredentials(newState)
            }
        }
    }

    Comment(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            resolveUserCredentials(newState){
                ActionDispatchers.dispatchResolveUserCredentials(newState)
            }
        }
    }

    MainMenuToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            logout(){
                ActionDispatchers.dispatchLogout()
            }
        }
    }
}