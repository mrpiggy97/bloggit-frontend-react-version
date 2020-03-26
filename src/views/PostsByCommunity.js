import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { mapUpdateCommunityPostsToProps } from 'store/mapActions'
import PostInfo from 'components/PostInfo'

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
            isAuthenticated : this.props.authenticated,
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
        this.props.updateCommunityPosts(page, this.community)
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
        this.updatePosts(1)//initial page
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({
                isAuthenticated : this.props.authenticated,
                posts : this.props.posts,
                nextPage : this.props.nextPage,
                previousPage : this.props.previousPage,
                fetchingPosts : this.props.fetchingPosts,
                fetchingStatus : this.props.fetchingStatus
            })
        }
    }

    render(){
        return(
            <div id="posts-by-community">
                <span className="community" >{this.state.community}</span>
                <div className="posts">
                    {this.state.posts.map(post => {
                        return <PostInfo
                                info={post}
                                isPreview={true}
                                isAuthenticated={this.state.isAuthenticated}
                                />
                    })}
                </div>
                <div className="arrows">
                    {this.state.previousPage
                        ?   <span className="previous-page active" onClick={this.getPreviousPagePosts}>
                                previous
                            </span>
                        :   <span className="previous-page inactive">previous</span>
                    }
                    {this.state.nextPage
                        ?   <span className="next-page active" onClick={this.getNextPagePosts}>
                                next
                            </span>
                        :   <span className="next-page inactive">next</span>
                    }
                </div>
            </div>
        )
    }
}

ConnectedPostsByCommunity.propTypes = {
    authenticated : PropTypes.bool.isRequired,
    posts : PropTypes.object.isRequired,
    nextPage : PropTypes.number.isRequired,
    previousPage : PropTypes.number.isRequired,
    fetchingPosts : PropTypes.bool.isRequired,
    fetchingStatus : PropTypes.object.isRequired,
    updateCommunityPosts : PropTypes.func.isRequired,
    match : PropTypes.object.isRequired
}

const PostsByCommunity = connect(mapStoreToProps, mapUpdateCommunityPostsToProps)
                                (ConnectedPostsByCommunity)

export default PostsByCommunity