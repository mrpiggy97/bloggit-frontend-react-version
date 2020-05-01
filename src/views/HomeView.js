import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostInfo from '../components/PostInfo'
import MapActions from 'store/MapActions'
import { MapState } from 'store/getters'
import './css/HomeView.css'

let actionMapper = new MapActions()
let stateMapper = new MapState()

export class ConnectedHomeView extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            posts : props.posts,
            nextPage : props.nextPage,
            previousPage : props.previousPage,
            authenticated : props.authenticated
        }

        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    getNextPagePosts(){
        if(this.state.nextPage <= 1){
            return null
        }
        this.props.updatePosts(this.state.nextPage)
    }

    getPreviousPagePosts(){
        if(this.state.previousPage <= 0){
            return null
        }
        this.props.updatePosts(this.state.previousPage)
    }

    componentDidMount(){
        if(this.props.nextPage === 0 && this.props.previousPage === 0){
            this.props.updatePosts(1)//initial page
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.posts !== this.props.posts){
            this.setState({
                posts : this.props.posts,
                nextPage : this.props.nextPage,
                previousPage : this.props.previousPage,
                authenticated : this.props.authenticated
            })
        }
    }

    render(){
        return(
            <div id="home-view">
                <div id="home-posts">
                    {this.state.posts.map(post => {
                        return <PostInfo
                                info={post}
                                isPreview={true}
                                key={post.uuid}
                                IsAuthenticated={this.props.authenticated}
                                history={this.props.history}
                                />
                    })}          
                </div>
                <div className="pagination-arrows">
                    {this.state.previousPage > 0 ?
                        <span className="previous-page-active"
                        onClick={this.getPreviousPagePosts}>prev page</span> :
                        <span className="previous-page-inactive">prev</span>
                    }
                    {this.state.nextPage > 1 ?
                        <span className="next-page-active"
                        onClick={this.getNextPagePosts}>next page</span> :
                        <span className="next-page-inactive">next</span>
                    }
                </div>
            </div>
        )
    }
}

ConnectedHomeView.propTypes = {
    authenticated : PropTypes.bool.isRequired,
    updatePosts : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired,
    nextPage : PropTypes.number,
    previousPage : PropTypes.number,
    history : PropTypes.object.isRequired
}

const HomeView = connect(stateMapper.HomeViewStateToProps, actionMapper.HomeViewActionsToProps)
                        (ConnectedHomeView)

export default HomeView