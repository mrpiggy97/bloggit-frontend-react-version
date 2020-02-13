import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostInfo from '../components/PostInfo'
import {  mapUpdatePostsToProps } from 'store/mapActions'
import './css/HomeView.css'

const mapStoreToProps = (state) => {
    console.log(state.posts)
    return {
        authenticated : state.authenticated,
        posts : state.posts,
        nextPage : state.nextPage,
        previousPage : state.previousPage
    }

}

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
        if(this.state.nextPage <= 0){
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
        let initialURL = `posts/?page=${1}`
        this.props.updatePosts(initialURL)
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
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
                <div className="posts">
                    {this.state.posts.map(post => {
                        return <PostInfo info={post} isPreview={true} key={post.uuid}
                                    Isauthenticated={this.props.authenticated}/>
                    })}          
                </div>
                <div className="pagination-arrows">
                    {this.state.previousPage > 0 ?
                        <span className="previous-page-active"
                        onClick={this.getPreviousPagePosts}>prev page</span> :
                        <span className="previous-page-inactive">prev</span>
                    }

                    {this.state.nextPage > 0 ?
                        <span className="next-page-active"
                        onClick={this.getNextPagePosts}>next page</span> :
                        <span className="next-page-inactive">next</span>
                    }
                </div>
            </div>
        )
    }
}

ConnectedHomeView.propsTypes = {
    authenticated : PropTypes.bool.isRequired,
    updatePosts : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired,
    nextPage : PropTypes.number,
    previousPage : PropTypes.number
}

const HomeView = connect(mapStoreToProps, mapUpdatePostsToProps)(ConnectedHomeView)

export default HomeView