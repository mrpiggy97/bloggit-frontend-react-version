import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import PostInfo from '../components/PostInfo'
import { mapAuthenticatedToProps } from '../store/getters'
import { mapUpdateCommunityPostsToProps } from '../store/mapActions'

class ConnectedPostsByCommunity extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            posts : props.state.posts,
            nextPage : props.state.nextPage,
            previousPage : props.state.previousPage,
            fetchingPosts : props.state.fetchingPosts,
            fetchingStatus : props.state.fetchingStatus,
            isAuthenticated : props.state.authenticated,
            community : ""
        }
    }

    render(){
        return(
            <div></div>
        )
    }
}