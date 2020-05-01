import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { MapState } from 'store/getters'
import MapActions from 'store/MapActions'

let stateMapper = new MapState()
let actionMapper = new MapActions()

function ConnectedMainMenu(props){
    const[IsAuthenticated, setIsAuthenticated] = useState(props.authenticated)
    const [username, setUsername] = useState(props.username)
    const [query, setQuery] = useState("")
    const history = useHistory()

    //update query when input changes
    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    const searchPosts = () => {
        console.log(query)
    }

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

    const goToHome = () => {
        if(history.location.pathname === "/"){
            return null
        }
        props.updatePosts(1)
        history.push("/")
    }

    //when store state.authenticated or state.posts get updated run effect
    //and change them
    useEffect(() => {
        setIsAuthenticated(props.authenticated)
        setUsername(props.username)
    }, [props.authenticated, props.username])
    
    return(
        <div id="main-menu">
            <div id="home">
                <span className="go-home" onClick={goToHome}>home</span>
                <input type="text" className="search-posts" onChange={updateQuery}></input>
                <span onClick={searchPosts}>search</span>
                <span>communities</span>
            </div>
            {IsAuthenticated ?
                <div id="user-related-links">
                    <span>{username}</span>
                    <span onClick={logout} >logout</span>
                </div> :
                <div id="user-related-links">
                    <span onClick={login}>login</span>
                    <span>register</span>
                </div>
            }
        </div>
    )
}

const MainMenu = connect(stateMapper.MainMenuStateToProps, actionMapper.MainMenuActionsToProps)
                        (ConnectedMainMenu)

export default MainMenu