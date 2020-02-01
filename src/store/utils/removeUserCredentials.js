const removeUserCredentials = (prevState) => {
    window.localStorage.removeItem('bloggit_token')
    window.localStorage.removeItem('bloggit_username')
    window.localStorage.removeItem('bloggit_profile_pic')
    window.localStorage.removeItem('bloggit_user_communities')

    let newState = {
        authenticated : null,
        username : null,
        profilePic : null,
        userCommunities : null,
    }

    return Object.assign({}, prevState, newState)
}

export default removeUserCredentials