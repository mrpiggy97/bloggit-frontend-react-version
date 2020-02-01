const setUserCredentials = (prevState, payload) => {
    window.localStorage.setItem('bloggit_token', payload.token)
    window.localStorage.setItem('bloggit_username', payload.username)
    window.localStorage.setItem('bloggit_profile_pic',  payload.profile_pic)
    window.localStorage.setItem('bloggit_user_communities', payload.user_communities)

    let newState = {
        authenticated : true,
        username : payload.username,
        profilePic : payload.profile_pic,
        userCommunities : payload.communities
    }

    return Object.assign({}, prevState, newState)
}

export default setUserCredentials