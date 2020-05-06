import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import likePost from '../services/PostServices/likePost.js'
import reportPost from '../services/PostServices/reportPost.js'
import MapActions from 'store/MapActions'

import './css/PostInfo.css'
//Note: the first argument for connect must be null when mapStateToProps is
//absent

let actionMappers = new MapActions()

export class ConnectedPostInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            owner : props.info.owner,
            date : props.info.date,
            title : props.info.title,
            text : props.info.text,
            communities : props.info.communities,
            uuid : props.info.uuid,
            likes : props.info.likes,
            liked : props.info.liked,
            reported : props.info.reported,
            isPreview : props.isPreview,
        }

        this.fakeLike = this.fakeLike.bind(this)
        this.fakeReport = this.fakeReport.bind(this)
        this.like = this.like.bind(this)
        this.report = this.report.bind(this)
        this.redirectToCommunity = this.redirectToCommunity.bind(this)
    }

    fakeLike(){
        this.setState((prevState) => {
            return { liked : prevState.liked ? false : true }
        })
    }

    fakeReport(){
        this.setState((prevState) => {
            return { reported : prevState.reported ? false : true }
        })
    }

    redirectToCommunity(){
        this.props.history.push(`/posts/${this.state.communities[0]}`)
    }

    async like(){

        if(this.state.liked || !this.props.isAuthenticated){
            return null
        }

        else if(!this.state.liked && this.props.isAuthenticated){
            try {
                await likePost(this.state.uuid)
                this.setState((prevState) => {
                    return { likes : prevState.likes + 1, liked : true }
                })
            }
            catch (error) {
                console.log("error ocurred at PostInfo component at like method")
                console.log(error.request.status)

                if(error.request.status === 401 || error.request.status === 403){
                    this.props.resolveUserCredentials({ authenticated : false })
                }
            }
        }
    }

    async report(){
        
        if(this.state.reported || !this.props.isAuthenticated){
            return null
        }
        
        else if(!this.state.reported && this.props.isAuthenticated){

            try {
                await reportPost(this.state.uuid)
                this.setState(() => {
                    return { reported : true }
                })
            }

            catch (error) {
                console.log("error ocurred at PostInfo component at")
                console.log("report method")
                console.log(error.request.status)

                if(error.request.status === 401 || error.request.status === 403){
                    this.props.resolveUserCredentials({ authenticated : false })
                }
            }
        }
    }

    render(){
        let activeOrInactive = this.state.liked ? 'active' : 'inactive'
        let likeClasses = `fa fa-thumbs-up ${activeOrInactive}`
        return(
            <div className={this.state.isPreview ? 'post-info-preview' : 'post-info'}>

                <div className="post-header">
                    <img src={this.state.owner.profile_pic} alt="" className="pic"/>
                    <span>{this.state.owner.username}</span>
                    <span className="date">{this.state.date}</span>
                </div>

                <span className="post-title">{this.state.title}</span>

                { !this.state.isPreview ?
                    <span className="post-body">{this.state.text}</span> :  null
                }

                <div className="post-footer">

                    <div className="communities">
                        {this.state.communities.map(com => {
                            return  <span className="community" key={com} onClick={this.redirectToCommunity}>
                                        c/{com}
                                    </span>
                        })}
                    </div>

                    { this.props.isAuthenticated ?
                        <div className="interaction">
                            <span className="likes">{this.state.likes}</span>
                            { !this.state.liked ?
                                <i className={likeClasses} onClick={this.like}></i> 
                                :<i className={likeClasses}></i>
                            }
                            { !this.state.reported ?
                                <span className="report" onClick={this.fakeReport}>
                                    report
                                </span>
                                : null
                            }
                            <span>{this.state.uuid}</span>
                        </div> :

                        <div className="interaction">
                            <span className="likes">{this.state.likes}</span>
                            <i className={likeClasses} onClick={this.fakeLike}>
                            </i>
                            { !this.state.reported ?
                                <span className="report" onClick={this.fakeReport}>
                                    report
                                </span> : null
                            }
                            <span>{this.state.uuid}</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

ConnectedPostInfo.propTypes = {
    info : PropTypes.object.isRequired,
    isPreview : PropTypes.bool.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
    history : PropTypes.object.isRequired,
    resolveUserCredentials : PropTypes.func.isRequired
}

const PostInfo = connect(null, actionMappers.PostInfoActionsToProps)(ConnectedPostInfo)

export default PostInfo