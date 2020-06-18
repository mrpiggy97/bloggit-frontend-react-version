import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapState from 'store/MapState'
import MapActions from 'store/MapActions'

import "./css/Authentication.css"

const StateMapper = new MapState()
const ActionMapper = new MapActions()

function ConnectedAuthentication(props){
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const { action } = useParams()

    const message1 = "either username or password are incorrect"
    const message2 = "either passwords don't match or all fields are invalid"

    const [message, setMessage] = useState("")

    const callAction = (e) => {
        e.preventDefault()
        if(action !== "register" && action !== "login"){
            throw new Error("action must be either be register or login")
        }
        else if(action === "login"){
            props.login(username, password1)
        }
        else if(action === "register"){
            props.registerUser(username, password1, password2)
        }
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword1 = (e) => {
        setPassword1(e.target.value)
    }

    const updatePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const togglePasswordText1 = () => {
        let newValue = showPassword1 ? false : true
        setShowPassword1(newValue)
    }

    const togglePasswordText2 = () => {
        let newValue = showPassword2 ? false : true
        setShowPassword2(newValue)
    }

    const redirectToHome = () => {
        if(props.authenticated){
            //api has a wierd bug were token won't properly be authenticated
            //unless window is reloaded, so history.push won't be used
            //since it redirects users between pages without reloading window
            window.location.replace("/")
        }
    }

    const updateMessage = () => {
        switch(action){
            case "login":
                setMessage(message1)
            break
            case "register":
                setMessage(message2)
            break
            default:
                setMessage("")
        }
    }
    //authenticated will only change after action has been changed
    useEffect(redirectToHome, [props.authenticated])
    useEffect(updateMessage, [action])
    return(
        <div id="authentication-view">
            <form id={action === "login" ? "login-form" : "register-form"} onSubmit={callAction}>
            
                <input type="text"
                id="username"
                value={username}
                onChange={updateUsername}
                placeholder="username"
                />

                <input
                type={showPassword1 ? "text" : "password"}
                id="password1"
                value={password1}
                onChange={updatePassword1}
                placeholder="password1"
                />

                <span onClick={togglePasswordText1} id="toggle-password1">
                    {showPassword1 ? "hide password1" : "show password1"}
                </span>
                {action === "register"
                    ?
                    (
                        <React.Fragment>                           
                            <input
                            type={showPassword2 ? "text" : "password"}
                            onChange={updatePassword2}
                            value={password2}
                            id="password2"
                            placeholder="password2"
                            />
                            <span onClick={togglePasswordText2} id="toggle-password2">
                                {showPassword2 ? "hide password2" : "show password2" }
                            </span>                         
                        </React.Fragment>
                    ) : null
                }
                <button id="action-button" type="submit"><span>{action}</span></button>
                {props.logging === null ?
                    <span id="message">{message}</span> : null
                }
            </form>
        </div>
    )
}

const Authentication = connect(StateMapper.Authentication, ActionMapper.AuthenticationToProps)
                        (ConnectedAuthentication)

ConnectedAuthentication.propTypes = {
    authenticated : PropTypes.bool,
    login : PropTypes.func.isRequired,
    registerUser : PropTypes.func.isRequired
}

export default Authentication