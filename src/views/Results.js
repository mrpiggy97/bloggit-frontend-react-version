import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostInfo from '../components/PostInfo'
import { MapState } from 'store/getters'
import MapActions from 'store/MapActions'

import "./css/CommonView.css"

let stateMapper = new MapState()
let actionMapper = new MapActions()

function ConnectedResults(props){

    const { query } = useParams()
    const history = useHistory()
    const [showPosts, setShowPosts] = useState(false)

    const getNextPagePosts = () => {
        props.updateResults(props.nextPage, query)
    }

    const getPreviousPagePosts = () => {
        props.updateResults(props.previousPage, query)
    }
    useEffect(() => {
        let newValue = props.fetchingPosts === false ? true : false
        setShowPosts(newValue)
    }, [props.fetchingPosts])

    useEffect(() => {
        if(props.posts.length === 0){
            props.updateResults(1, query)
        }
    })

    return(
        <div id="common-view">
            <div id="common-title">
                {props.posts.length > 0
                    ? <span>results for {query}</span>
                    : <span>no results for {query}`</span>
                }
            </div>
            {showPosts && !props.fetchingPosts ?
                <div id="common-posts">
                    {props.posts.map(post => {
                        return <PostInfo
                                info={post}
                                isPreview={true}
                                isAuthenticated={props.authenticated}
                                history={history}
                                key={post.uuid}
                                />
                    })}
                </div> :
                <div id="commom-posts">
                    <span>loading</span>
                </div> 
            }

            <div className="arrows">
                {props.previousPage
                    ? <span onClick={getPreviousPagePosts}>previous page</span>
                    : <span>previous page</span>
                }
                {props.nextPage
                    ? <span onClick={getNextPagePosts}>next page</span>
                    : <span>next page</span>
                }
            </div>
        </div>
    )
}

ConnectedResults.propTypes = {
    updateResults : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired,
    nextPage : PropTypes.number,
    previousPage : PropTypes.number,
    authenticated : PropTypes.bool.isRequired,
    fetchingPosts : PropTypes.bool.isRequired,
    fetchingStatus : PropTypes.object.isRequired
}

const Results = connect(stateMapper.ResultsStateToProps, actionMapper.ResultsToProps)
                        (ConnectedResults)

export default Results

//TODO MAY 6 CHANGE TEST FOR POSTINFO CHANGES HAVE BEEN MADE TO COMPONENT