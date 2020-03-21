import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { mapAuthenticatedToProps } from '../store/getters'

export function ConnectedComment(props){
    const [info, setInfo] = useState(props.info)
    const [isAuthenticated, setIsAuthenticated] = useState(props.authenticated)
    const [showParent, setShowParent] = useState(false)

    const like = () => {
        if(info.liked || !isAuthenticated){
            return null
        }
        let newState = { ...info }
        newState.likes++
        newState.liked = true
        setInfo(newState)
    }

    const report = () => {
        if(info.reported || !isAuthenticated){
            return null
        }
        let newState = { ...info, reported : true}
        setInfo(newState)
    }

    const toogleParent = () => {
        let newValue = showParent ? false : true
        setShowParent(newValue)
    }

    useEffect(() => {
        setIsAuthenticated(props.authenticated)
    }, [props.authenticated])


    let classes = useMemo(() => {
        let baseClass
        let interactive = isAuthenticated ? 'authenticated' : 'unauthenticated'

        if(info.is_original){
            baseClass = 'original-comment'
        }
        else{
            baseClass = info.has_parent ? 'child-comment-has-parent' : 'child-comment'
        }

        return `${baseClass} ${interactive}`

    }, [props.authenticated])

    return (
        <div className={classes}>
            <div className="comment-header">
                <span className="owner">{props.info.owner.username}</span>
                <span className="date">{props.info.date}</span>
            </div>
            <div className="comment-body">
                {info.has_parent
                    ?   <span className="parent-comment-owner" onClick={toogleParent}>
                            in reply to : {info.parent_comment.owner.username}
                        </span>

                    :   null
                }

                {info.has_parent && showParent
                    ?   <span className="parent-comment-text">
                            {info.parent_comment.text}
                        </span>
                    :   null
                }
                <span className="comment-text">{info.text}</span>
                <div className="comment-footer">
                    {isAuthenticated  
                        ?   info.liked
                                ?   <span className="like-active">like</span>
                                :   <span className="like-inactive" onClick={like}>like</span>
                        : <span className="like-inactive">like</span>
                    }
                    <span className="comment-likes">{info.likes}</span>
                    {isAuthenticated
                        ?   info.reported
                                ?   null
                                :   <span className="report" onClick={report}>report</span>
                        :   <span className="report">report</span>
                    }
                </div>
            </div>
        </div>
    )
}

ConnectedComment.propTypes = {
    info : PropTypes.object.isRequired,
    authenticated : PropTypes.bool.isRequired
}

const Comment = connect(mapAuthenticatedToProps)(ConnectedComment)

export default Comment