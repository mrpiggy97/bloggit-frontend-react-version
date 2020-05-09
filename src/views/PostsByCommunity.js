import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTimeout } from 'timers'

import MapActions from 'store/MapActions'
import { MapState } from 'store/getters'
import PostInfo from 'components/PostInfo'

import "./css/CommonView.css"

let actionMapper = new MapActions()
let stateMapper = new MapState() 

export class ConnectedPostsByCommunity extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showPosts : false
        }

        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    getNextPagePosts(){
        if(!this.props.nextPage){
            return null
        }
        this.setState({showPosts : false})
        this.props.updateCommunityPosts(this.props.nextPage, this.props.match.params.community)
        this.showNewPosts()
    }

    getPreviousPagePosts(){
        if(!this.props.previousPage){
            return null
        }
        this.setState({showPosts : false})
        this.props.updateCommunityPosts(this.props.previousPage, this.props.match.params.community)
        this.showNewPosts()
    }

    showNewPosts(){
        setTimeout(() => {
            this.setState({showPosts : true})
        }, 750);
    }

    componentDidMount(){
        this.props.updateCommunityPosts(1, this.props.match.params.community)
        this.showNewPosts()
    }

    render(){
        return(
            <div id="common-view">
                <div id="common-title">
                    <span>{this.props.match.params.community}</span>
                </div>
                {this.state.showPosts ?
                    <div id="common-posts">
                        {this.props.posts.map(post => {
                            return <PostInfo
                                    info={post}
                                    isPreview={true}
                                    isAuthenticated={this.props.authenticated}
                                    history={this.props.history}
                                    key={post.uuid}
                                    />
                        })}
                    </div> :
                    <div id="common-posts">
                        <span>loading...</span>
                    </div>           
                }


                <div className="arrows">
                    {this.props.previousPage
                        ?   <span className="previous-page active" onClick={this.getPreviousPagePosts}>
                                previous page
                            </span>
                        :   <span className="previous-page inactive">previous</span>
                    }
                    {this.props.nextPage
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
    fetchingPosts : PropTypes.bool,
    fetchingStatus : PropTypes.object.isRequired,
    updateCommunityPosts : PropTypes.func.isRequired,
    match : PropTypes.object.isRequired,
    history : PropTypes.object.isRequired
}

const PostsByCommunity = connect(stateMapper.PostsByCommunityStateToProps,
                                actionMapper.PostsByCommunityActionsToProps)
                                (ConnectedPostsByCommunity)

export default PostsByCommunity