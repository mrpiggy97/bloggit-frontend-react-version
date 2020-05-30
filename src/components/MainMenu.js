import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import MapState from 'store/MapState'
import MapActions from 'store/MapActions'

import "./css/MainMenu.css"

let StateMapper = new MapState()
let ActionMappers = new MapActions()

function ConnectedMainMenu(props){
    const [query, setQuery] = useState("")
    const history = useHistory()

    //update query when input changes
    const updateQuery = (e) => {
        setQuery(e.target.value)
    }
    //routing
    const searchPosts = (e) => {
        e.preventDefault()
        history.push(`/posts/search/${query}`)
    }

    const goToLogin = () => {
        history.push("/authentication/login")
    }

    const goToRegistration = () => {
        history.push("/authentication/register")
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
                <span id="communities">communities</span>
            </div>
            {props.authenticated ?
                <div id="user">
                    <span>{props.username}</span>
                    <span>logout</span>
                    <span>post</span>
                </div> :
                <div id="user">
                    <span onClick={goToLogin}>login</span>
                    <span onClick={goToRegistration}>register</span>
                    <span>post</span>
                </div>
            }
        </div>
    )
}

ConnectedMainMenu.propTypes = {
    authenticated : PropTypes.bool.isRequired,
    username : PropTypes.string,
    logout : PropTypes.func.isRequired
}

const MainMenu = connect(StateMapper.MainMenuStateToProps, ActionMappers.MainMenuToProps)
                    (ConnectedMainMenu)

export default MainMenu