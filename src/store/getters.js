//getters of state
const mapStateToProps = (state) => {
    return { state : state }
}

export const mapAuthenticatedToProps = (state) => {
    return { authenticated : state.authenticated }
}

export class MapState{
    //components
    MainMenuStateToProps(state){
        return {
            authenticated : state.authenticated,
            username : state.username
        }
    }
    //views
    HomeViewStateToProps(state){
        return {
            authenticated : state.authenticated,
            posts : state.posts,
            nextPage : state.nextPage,
            previousPage : state.previousPage
        }
    }

    PostsByCommunityStateToProps(state){
        return {
            authenticated : state.authenticated,
            posts : state.posts,
            nextPage : state.nextPage,
            previousPage : state.previousPage,
            fetchingPosts : state.fetchingPosts,
            fetchingStatus : state.fetchingStatus
        }
    }

    ResultsStateToProps(state){
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

export default mapStateToProps