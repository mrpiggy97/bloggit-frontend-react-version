import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MapState } from 'store/getters'
import MapActions from 'store/MapActions'

import "./css/MainMenu.css"

let stateMapper = new MapState()
let actionMapper = new MapActions()

function ConnectedMainMenu(props){
    const [query, setQuery] = useState("")
    const history = useHistory()

    //update query when input changes
    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    //authentication
    const logout = () => {
        props.resolveUserCredentials({authenticated : false})
    }

    const login = () => {
        let newState = {
            authenticated : true,
            username : 'fabianj444',
            profilePic : null,
            userCommunities : []
        }

        props.resolveUserCredentials(newState)
    }
    //routing
    const searchPosts = (e) => {
        e.preventDefault()
        history.push(`/posts/search/${query}`)
    }

    const goToHome = () => {
        if(history.location.pathname === "/"){
            return null
        }
        history.push("/")
    }
    return(
        <div id="main-menu">
            <div id="home">
                <span className="go-home" onClick={goToHome}>home</span>
                <form id="search-posts" onSubmit={searchPosts}>
                    <input type="text" onChange={updateQuery}/>
                    <button type="submit" id="search-posts">search</button>
                </form>
                <span>communities</span>
            </div>
            {props.authenticated ?
                <div id="user">
                    <span>{props.username}</span>
                    <span onClick={logout}>logout</span>
                </div> :
                <div id="user">
                    <span onClick={login}>login</span>
                    <span>register</span>
                </div>
            }
        </div>
    )
}

ConnectedMainMenu.propTypes = {
    resolveUserCredentials : PropTypes.func.isRequired,
    authenticated : PropTypes.bool.isRequired,
    username : PropTypes.string
}

const MainMenu = connect(stateMapper.MainMenuStateToProps, actionMapper.MainMenuActionsToProps)
                        (ConnectedMainMenu)

export default MainMenu