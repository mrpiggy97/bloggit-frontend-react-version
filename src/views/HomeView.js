import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostInfo from '../components/PostInfo'
import { mapAuthenticatedToProps } from 'store/getters'
import { mapResolveUserCredentialsToProps } from 'store/actions'
import './css/HomeView.css'
import getPosts from 'services/PostServices/getPosts'

export class ConnectedHomeView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            posts : props.posts,
            page : 1,
            nextPage : null,
            previousPage : null
        }

        this.getNextPagePosts = this.getNextPagePosts.bind(this)
        this.getPreviousPagePosts = this.getPreviousPagePosts.bind(this)
    }

    async getPagePosts(page){

        try {
            let response = await getPosts(page)
            this.setState(() => {
                return {
                    posts : response.data.results,
                    nextPage : response.data.next_page,
                    previousPage : response.data.previous_page,
                    page : page
                }
            })
            console.log(page)

            if(response.data.authenticated !== this.props.authenticated){
                //this means token has expired and we should
                //resolve those credentials, in this case that means deleting
                //the token and settting user information to null
                this.props.resolveUserCredentials({ authenticated : false })
            }
        }
        
        catch (error) {
            console.log("error ocurred at HomeView at getPagePosts method")
            console.log(error)
        }
    }

    getNextPagePosts(){
        if(!this.state.nextPage){
            return null
        }

        this.getPagePosts(this.state.nextPage)
    }

    getPreviousPagePosts(){
        if(!this.state.previousPage){
            return null
        }

        this.getPagePosts(this.state.previousPage)
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
                    {this.state.previousPage ?
                        <span className="previous-page-active"
                        onClick={this.getPreviousPagePosts}>prev</span> :
                        <span className="previous-page-inactive">prev</span>
                    }

                    {this.state.nextPage ?
                        <span className="next-page-active"
                        onClick={this.getNextPagePosts}>next</span> :
                        <span className="next-page-inactive">next</span>
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(this.props.posts.length == 0){
            this.getPagePosts(1)
        }
    }
}

ConnectedHomeView.propsTypes = {
    authenticated : PropTypes.bool.isRequired,
    resolveUserCredentials : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired
}

const HomeView = connect(mapAuthenticatedToProps, mapResolveUserCredentialsToProps)
                        (ConnectedHomeView)

export default HomeView