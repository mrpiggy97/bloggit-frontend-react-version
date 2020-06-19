import React, { useState, useRef, useEffect } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTimeout } from 'timers'

import Loading from 'components/Loading'
import PostInfo from 'components/PostInfo'
import MapActions from 'store/MapActions'
import MapState from 'store/MapState'
import "./css/RenderPosts.css"

let actionMappers = new MapActions()
let stateMappers = new MapState()

function ConnectedRenderPosts(props){

    const [showPosts, setShowPosts] = useState(false)
    const { query } = useParams()
    const location = useLocation()
    //history is a required prop for PostInfo Component
    const history = useHistory()

    const isMounted = useRef(false)

    const getPostsUpdater = () => {
        let postsUpdater
        switch (location.pathname){
            case "/":
                postsUpdater = props.updatePosts
            break
            case `/posts/${query}`:
                postsUpdater = props.updateCommunityPosts
            break
            case `/posts/search/${query}`:
                postsUpdater = props.updateResults
            break
            default:
                postsUpdater = null
        }

        return postsUpdater
    }

    const postsUpdater = getPostsUpdater()

    const showNewPosts = () => {
        setTimeout(() => {
            if(isMounted.current === true){
                setShowPosts(true)
            }
        }, 750)
    }

    const getNextPagePosts = () => {
        //not run if next page is null or 0, or if postsUpdater is, for some
        //reason, null
        if(!props.nextPage || !postsUpdater){
            return null
        }

        //hide current posts
        setShowPosts(false)
        //since 2 out of the three action dispatchers recieve two parameters
        //this if else statement has to be put in place
        if(location.pathname !== "/"){
            postsUpdater(props.nextPage, query)
        }
        else{
            postsUpdater(props.nextPage)
        }
        showNewPosts()
    }

    const getPreviousPagePosts = () => {
        //if previous page is 0 or null, or if postsUpdater is for some reason null
        //function should not be run
        if(!props.previousPage || !postsUpdater){
            return null
        }

        setShowPosts(false)
        //postsUpdater might take more than 1 argument depending on location
        if(location.pathname !== "/"){
            postsUpdater(props.previousPage, query)
        }
        else{
            postsUpdater(props.previousPage)
        }
        //show new posts after 750 miliseconds have paste
        showNewPosts()
    }
    //will only run when view has been mounted and if query has been updated
    const viewMountedQueryUpdated = () => {

        if(postsUpdater === null){
            return null
        }
        //after view has finished finished mounting, showPosts will be true
        //when query updates posts should be hidden, the following line will only be
        //run after query has been updated
        if(showPosts){
            setShowPosts(false)
        }

        if(location.pathname !== "/"){
            postsUpdater(1, query)
        }
        else{
            postsUpdater(1)
        }

        showNewPosts()
    }

    //effect will only get called when component has been mounted
    //and when component will unmount
    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }

        //eslint-disable-next-line
    }, [])

    useEffect(viewMountedQueryUpdated, [query])

    return(
        <div id="render-posts">
            <div id="title">
                {query ?
                    <span>{query}</span> : null
                }
            </div>
            {showPosts ?
                <div id="posts">
                    {props.posts.map(post => {
                        return <PostInfo
                                key={post.uuid}
                                info={post}
                                isPreview={true}
                                isAuthenticated={props.authenticated}
                                history={history}
                                />
                    })}
                </div> :
                <div id="posts">
                    <Loading/>
                </div>
            }
            <div id="arrows">
                {props.previousPage
                    ? <i className="far fa-arrow-alt-circle-left arrow-active" onClick={getPreviousPagePosts}></i>
                    : <i className="far fa-arrow-alt-circle-left arrow-inactive"></i>
                }
                {props.nextPage
                    ? <i className="far fa-arrow-alt-circle-right arrow-active"
                    onClick={getNextPagePosts}/>
                    : <i className="far fa-arrow-alt-circle-right arrow-inactive"></i>
                }
            </div>
        </div>
    )
}

const RenderPosts = connect(stateMappers.RenderPostsStateToProps, actionMappers.RenderPostsToProps)
                            (ConnectedRenderPosts)

export default RenderPosts