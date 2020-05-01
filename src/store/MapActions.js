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
}

export default class MapActions{
    //views
    HomeViewActionsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            updatePosts(page){
                ActionDispatchers.dispatchUpdatePosts(page)
            }
        }
    }

    PostsByCommunityActionsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            updateCommunityPosts(page, community){
                ActionDispatchers.dispatchUpdateCommunityPosts(page, community)
            }
        }
    }
    //components
    MainMenuActionsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            updateCommunityPosts(page, community){
                ActionDispatchers.dispatchUpdateCommunityPosts(page, community)
            },

            updatePosts(page){
                ActionDispatchers.dispatchUpdatePosts(page)
            },

            resolveUserCredentials(newState){
                ActionDispatchers.dispatchResolveUserCredentials(newState)
            }
        }
    }

    PostInfoActionsToProps(dispatch){
        let ActionDispatchers = new DispatchActions(dispatch)
        return {
            resolveUserCredentials(newState){
                ActionDispatchers.dispatchResolveUserCredentials(newState)
            }
        }
    }
}