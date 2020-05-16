//state Mapper

export default class MapState{

    //components
    MainMenuStateToProps(state){
        return {
            authenticated : state.authenticated,
            username : state.username
        }
    }

    //views
    RenderPostsStateToProps(state){
        return {
            authenticated : state.authenticated,
            posts : state.posts,
            nextPage : state.nextPage,
            previousPage : state.previousPage,
            fetchingPosts : state.fetchingPosts,
            fetchingStatus : state.fetchingStatus
        }
    }
}