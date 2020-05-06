import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapActions from 'store/MapActions'

let actionMapper = new MapActions()

export function ConnectedComment(props){
    //aspects of props.info will change so it is a good idea to
    //set props.info as state
    const [info, setInfo] = useState(props.info)
    const [showParent, setShowParent] = useState(false)

    const like = () => {
        if(info.liked || !props.isAuthenticated){
            return null
        }
        let newState = { ...info }
        newState.likes++
        newState.liked = true
        setInfo(newState)
    }

    const report = () => {
        if(info.reported || !props.isAuthenticated){
            return null
        }
        let newState = { ...info, reported : true}
        setInfo(newState)
    }

    const toogleParent = () => {
        let newValue = showParent ? false : true
        setShowParent(newValue)
    }


    let classes = useMemo(() => {
        let baseClass
        let interactive = props.isAuthenticated ? 'authenticated' : 'unauthenticated'

        if(info.is_original){
            baseClass = 'original-comment'
        }
        else{
            baseClass = info.has_parent ? 'child-comment-has-parent' : 'child-comment'
        }

        return `${baseClass} ${interactive}`

    }, [props.isAuthenticated])

    return (
        <div className={classes}>
            <div className="comment-header">
                <span className="owner">{info.owner.username}</span>
                <span className="date">{info.date}</span>
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
                    {props.isAuthenticated  
                        ?   info.liked
                                ?   <span className="like-active">like</span>
                                :   <span className="like-inactive" onClick={like}>like</span>
                        : <span className="like-inactive">like</span>
                    }
                    <span className="comment-likes">{info.likes}</span>
                    {props.isAuthenticated
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

Comment.propTypes = {
    info : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
    resolveUserCredentials : PropTypes.func.isRequired
}

const Comment = connect(null, actionMapper.Comment)(ConnectedComment)

export default Comment