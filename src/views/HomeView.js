import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTimeout } from 'timers'

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
            showPosts : false
        }

        this._mounted = false

        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    getNextPagePosts(){
        if(this.props.nextPage <= 1){
            return null
        }
        this.setState({showPosts : false})
        this.props.updatePosts(this.props.nextPage)
        this.ShowNewPosts()
    }

    getPreviousPagePosts(){
        if(this.props.previousPage <= 0){
            return null
        }
        this.setState({showPosts : false})
        this.props.updatePosts(this.props.previousPage)
        this.ShowNewPosts()
    }

    ShowNewPosts(){
        if(this._mounted){
            setTimeout(() => {
                this.setState({showPosts : true})
            }, 750);            
        }
    }

    componentDidMount(){
        //meaning app was mounted with an empty store
        this._mounted = true
        this.props.updatePosts(1)
        this.ShowNewPosts()
    }

    componentWillUnmount(){
        this._mounted = false
    }

    render(){
        return(
            <div id="home-view">
                {this.state.showPosts ?
                    <div id="home-posts">
                        {this.props.posts.map(post => {
                            return <PostInfo
                                    info={post}
                                    isPreview={true}
                                    key={post.uuid}
                                    isAuthenticated={this.props.authenticated}
                                    history={this.props.history}
                                    />
                        })}          
                    </div> :
                    
                    <div id="home-posts">
                        <span>loading...</span>
                    </div>
                }
                <div className="pagination-arrows">
                    {this.props.previousPage > 0 ?
                        <span className="previous-page-active"
                        onClick={this.getPreviousPagePosts}>prev page</span> :
                        <span className="previous-page-inactive">prev</span>
                    }
                    {this.props.nextPage > 1 ?
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
    fetchingPosts : PropTypes.bool,
    fetchingStatus : PropTypes.object.isRequired,
    previousPage : PropTypes.number,
    history : PropTypes.object.isRequired
}

const HomeView = connect(stateMapper.HomeViewStateToProps, actionMapper.HomeViewActionsToProps)
                        (ConnectedHomeView)

export default HomeView