import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTimeout } from 'timers'

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
        //to prevent double clicking next page
        //user should wait for the request page to load before
        //trying to get to the next one
        if(showNewPosts === false){
            return null
        }
        setShowPosts(false)
        props.updateResults(props.nextPage, query)
        showNewPosts()
    }

    const getPreviousPagePosts = () => {
        //to prevent double clicking next page
        //user should wait for the requested page before
        //trying to get the previous one
        if(showNewPosts === false){
            return null
        }
        setShowPosts(false)
        props.updateResults(props.previousPage, query)
        showNewPosts()
    }
    //this will give time to the dom to finish updating posts
    const showNewPosts = () => {
        setTimeout(() => {
            setShowPosts(true)
        }, 750);
    }

    const componentHasMounted = () => {
        props.updateResults(1, query)
        showNewPosts()
    }

    const queryHasUpdated = () => {
        setShowPosts(false)
        props.updateResults(1, query)
        showNewPosts()
    }
    //onyly will get called when it has been mounted
    useEffect(componentHasMounted, [])

    //only will get called when params have been updated
    useEffect(queryHasUpdated, [query])

    return(
        <div id="common-view">
            <div id="common-title">
                {props.posts.length > 0
                    ? <span>results for {query}</span>
                    : <span>no results for {query}`</span>
                }
            </div>
            {showPosts ?
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
                <div id="common-posts">
                    <span>loading...</span>
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
    fetchingPosts : PropTypes.bool,
    fetchingStatus : PropTypes.object.isRequired
}

const Results = connect(stateMapper.ResultsStateToProps, actionMapper.ResultsToProps)
                        (ConnectedResults)

export default Results

//TODO MAY 6 CHANGE TEST FOR POSTINFO CHANGES HAVE BEEN MADE TO COMPONENT