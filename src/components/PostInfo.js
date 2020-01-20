import React from 'react'
import PropTypes from 'prop-types'
import './css/PostInfo.css'

class PostInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            owner: props.info.owner,
            date: props.info.date,
            title: props.info.title,
            text: props.info.text,
            communities: props.info.communities,
            uuid: props.info.uuid,
            likes: props.info.likes,
            liked: props.info.liked,
            reported: props.info.reported,
            isPreview: props.isPreview,
            authenticated: false
        }

        this.fakeLike = this.fakeLike.bind(this)
        this.fakeReport = this.fakeReport.bind(this)
        this.like = this.like.bind(this)
        this.report = this.report.bind(this)
    }

    fakeLike(){
        this.setState((prevState) => {
            return {liked: prevState.liked ? false : true}
        })
    }

    fakeReport(){
        this.setState((prevState) => {
            return {reported: prevState.reported ? false : true}
        })
    }

    like(){
        return null
    }

    report(){
        return null
    }

    render(){
        let activeOrInactive = this.state.liked ? 'active' : 'inactive'
        let likeClasses =   `fa fa-thumbs-up ${activeOrInactive}` 
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
                            return <span className="community" key={com}>c/{com}</span>
                        })}
                    </div>

                    { this.state.authenticated ?
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
                        </div>
                    }
                </div>
            </div>
        )
    }
}

PostInfo.propTypes = {
    info: PropTypes.object.isRequired,
    isPreview: PropTypes.bool.isRequired
}

export default PostInfo