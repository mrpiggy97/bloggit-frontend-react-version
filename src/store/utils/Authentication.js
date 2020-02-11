class Authentication{
    constructor(prevState, payload){
        this.prevState = prevState
        this.payload = payload
        this.newState = null
    }

    static removeUserItemsFromStorage(){
        window.localStorage.removeItem('bloggit_token')
        window.localStorage.removeItem('bloggit_username')
        window.localStorage.removeItem('bloggit_profile_pic')
        window.localStorage.removeItem('bloggit_user_communities')
    }

    removeUserCredentials(){

        window.localStorage.removeItem('bloggit_token')
        window.localStorage.removeItem('bloggit_username')
        window.localStorage.removeItem('bloggit_profile_pic')
        window.localStorage.removeItem('bloggit_user_communities')
        
        this.newState = {
            authenticated : false,
            username : null,
            profilePic : null,
            userCommunities : null,
            token : null
        }

        return Object.assign({}, this.prevState, this.newState)
    }

    setUserCredentials(){
        window.localStorage.setItem('bloggit_token', this.payload.token)
        window.localStorage.setItem('bloggit_username', this.payload.username)
        window.localStorage.setItem('bloggit_profile_pic',  this.payload.profile_pic)
        window.localStorage.setItem('bloggit_user_communities', this.payload.user_communities)

        this.newState = {
            authenticated : true,
            username : this.payload.username,
            profilePic : this.payload.profile_pic,
            userCommunities : this.payload.communities
        }

        return Object.assign({}, this.prevState, this.newState)
    }

    setAuthenticationState(){
        if(this.payload.authenticated){
            return this.setUserCredentials()
        }
        else{
            return this.removeUserCredentials()
        }
    }
}

export default Authentication