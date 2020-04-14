import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { mapUpdateCommunityPostsToProps } from 'store/mapActions'
import PostInfo from 'components/PostInfo'

import "./css/PostsByCommunity.css"

let mapStoreToProps = (state) => {
    return {
        authenticated : state.authenticated,
        posts : state.posts,
        nextPage : state.nextPage,
        previousPage : state.previousPage,
        fetchingStatus : state.fetchingStatus,
        fetchingPosts : state.fetchingPosts
    }
}

export class ConnectedPostsByCommunity extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            community : this.props.match.params.community,
            authenticated : this.props.authenticated,
            posts : this.props.posts,
            nextPage : this.props.nextPage,
            previousPage : this.props.previousPage,
            fetchingPosts : this.props.fetchingPosts,
            fetchingStatus : this.props.fetchingStatus
        }

        this.updatePosts = this.updatePosts.bind(this)
        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    updatePosts(page){
        this.props.updateCommunityPosts(page, this.state.community)
    }

    getNextPagePosts(){
        if(!this.state.nextPage){
            return null
        }
        this.updatePosts(this.state.nextPage)
    }

    getPreviousPagePosts(){
        if(!this.state.previousPage){
            return null
        }
        this.updatePosts(this.state.previousPage)
    }

    componentDidMount(){
        this.updatePosts(1)
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({
                authenticated : this.props.authenticated,
                posts : this.props.posts,
                nextPage : this.props.nextPage,
                previousPage : this.props.previousPage,
                fetchingPosts : this.props.fetchingPosts,
                fetchingStatus : this.props.fetchingStatus
            })

            if(prevProps.match.params.community !== this.props.match.params.community){
                this.setState({
                    community : this.props.match.params.community
                })
            }
        }
    }

    render(){
        return(
            <div id="posts-by-community">
                <div id="community-slug">
                    <span>{this.state.community}</span>
                </div>
                <div id="community-posts">
                    {this.state.posts.map(post => {
                        return <PostInfo
                                info={post}
                                isPreview={true}
                                IsAuthenticated={this.state.authenticated}
                                history={this.props.history}
                                key={post.uuid}
                                />
                    })}
                </div>
                <div className="arrows">
                    {this.state.previousPage
                        ?   <span className="previous-page active" onClick={this.getPreviousPagePosts}>
                                previous page
                            </span>
                        :   <span className="previous-page inactive">previous</span>
                    }
                    {this.state.nextPage
                        ?   <span className="next-page active" onClick={this.getNextPagePosts}>
                                next page
                            </span>
                        :   <span className="next-page inactive">next page</span>
                    }
                </div>
            </div>
        )
    }
}

ConnectedPostsByCommunity.propTypes = {
    authenticated : PropTypes.bool.isRequired,
    posts : PropTypes.array.isRequired,
    nextPage : PropTypes.number,
    previousPage : PropTypes.number,
    fetchingPosts : PropTypes.bool.isRequired,
    fetchingStatus : PropTypes.object.isRequired,
    updateCommunityPosts : PropTypes.func.isRequired,
    match : PropTypes.object.isRequired,
    history : PropTypes.object.isRequired
}

const PostsByCommunity = connect(mapStoreToProps, mapUpdateCommunityPostsToProps)
                                (ConnectedPostsByCommunity)

export default PostsByCommunity