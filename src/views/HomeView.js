import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostInfo from '../components/PostInfo'
import {  mapUpdatePostsToProps } from 'store/actions'
import './css/HomeView.css'

const mapStoreToProps = (state) => {
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
            previousPage : props.previousPage
        }

        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    getNextPagePosts(){
        this.props.updatePosts(this.state.nextURL)
    }

    getPreviousPagePosts(){
        this.props.updatePosts(this.state.previousURL)
    }

    componentDidMount(){
        let initialURL = `posts/?page=${1}`
        this.props.updatePosts(initialURL)
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

        let nextPage = this.state.nextPage
        let previousPage = this.state.previousPage

        let nextPageURL = nextPage ? `posts/?page=${nextPage}` : null
        let previousPageURL = previousPage ? `posts/?page=${previousPage}` : null

        return(
            <div id="home-view">
                <div className="posts">
                    {this.state.posts.map(post => {
                        return <PostInfo info={post} isPreview={true} key={post.uuid}
                                    Isauthenticated={this.props.authenticated}/>
                    })}          
                </div>
                <div className="pagination-arrows">
                    {previousPageURL ?
                        <span className="previous-page-active"
                        onClick={this.getPreviousPagePosts}>prev page</span> :
                        <span className="previous-page-inactive">prev</span>
                    }

                    {nextPageURL ?
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