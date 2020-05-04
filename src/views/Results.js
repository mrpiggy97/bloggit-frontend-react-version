import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostInfo from '../components/PostInfo'
import { MapState } from 'store/getters'
import MapActions from 'store/MapActions'

let stateMapper = new MapState()
let actionMapper = new MapActions()

function ConnectedResults(props){

    const [posts, setPosts] = useState(props.posts)
    const [nextPage, setNextPage] = useState(props.nextPage)
    const [previousPage, setPreviousPage] = useState(props.previousPage)
    const [IsAuthenticated, setIsAuthenticated] = useState(props.authenticated)
    const { query } = useParams()
    const history = useHistory()

    const updatePosts = (page) => {
        props.updateResults(page, query)
    }

    const getNextPagePosts = () => {
        updatePosts(nextPage)
    }

    const getPreviousPagePosts = () => {
        updatePosts(previousPage)
    }

    useEffect(() => {
        setPosts(props.posts)
        setNextPage(props.nextPage)
        setPreviousPage(props.previousPage)
        setIsAuthenticated(props.authenticated)
    }, [props.posts, props.nextPage, props.previousPage, props.authenticated])

    return(
        <div id="results">
            <div className="results-query">
                <span>{query}</span>
            </div>
            <div className="posts-results">
                {posts.map(post => {
                    return <PostInfo
                            info={post}
                            isPreview={true}
                            IsAuthenticated={IsAuthenticated}
                            history={history}
                            key={post.uuid}
                            />
                })}
            </div>
            <div className="arrows">
                {previousPage
                    ? <span onClick={getPreviousPagePosts}>previous page</span>
                    : <span>previous page</span>
                }
                {nextPage
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
}

const Results = connect(stateMapper.ResultsStateToProps, actionMapper.ResultsToProps)
                        (ConnectedResults)

export default Results