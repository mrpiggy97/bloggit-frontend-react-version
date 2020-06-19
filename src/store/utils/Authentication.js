import LoginAPIcall from 'services/Authentication/LoginAPIcall'
import RegisterAPIcall from 'services/Authentication/RegisterAPIcall'
import LogoutAPIcall from 'services/Authentication/LogoutAPIcall'

class Authentication{
    constructor(payload){
        this.payload = payload
        this.newState = null
    }

    static removeUserItemsFromStorage(){
        localStorage.removeItem('bloggit_token')
        localStorage.removeItem('bloggit_username')
        localStorage.removeItem('bloggit_profile_pic')
        localStorage.removeItem('bloggit_user_communities')
        //should only return an object containing null user credentials
        this.newState = {
            username : null,
            userCommunities : null,
            profilePic : null,
            authenticated : false
        }

        return this.newState
    }

    removeUserCredentials(){
        localStorage.removeItem('bloggit_token')
        localStorage.removeItem('bloggit_username')
        localStorage.removeItem('bloggit_profile_pic')
        localStorage.removeItem('bloggit_user_communities')
        
        this.newState = {
            authenticated : false,
            username : null,
            profilePic : null,
            userCommunities : null,
        }

        return this.newState
    }

    setUserCredentials(){
        localStorage.setItem('bloggit_token', this.payload.token)
        localStorage.setItem('bloggit_username', this.payload.username)
        localStorage.setItem('bloggit_profile_pic',  this.payload.profile_pic)
        localStorage.setItem('bloggit_user_communities', this.payload.communities)

        this.newState = {
            authenticated : true,
            username : this.payload.username,
            profilePic : this.payload.profile_pic,
            userCommunities : this.payload.communities
        }

        return this.newState
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

export async function Login(username, password){
    let response
    try {
        response = await LoginAPIcall(username, password)
        let auth = new Authentication(response)
        return Promise.resolve(auth.setAuthenticationState())
    }
    catch (error) {
        console.error("error ocurred at Login function in Authentication module")
        console.error(error)
        return Promise.resolve({ logging : null })
    }
}

export async function Register(username, password1, password2){
    let response
    try{
        response = await RegisterAPIcall(username, password1, password2)
        let auth = new Authentication(response.data)
        return auth.setAuthenticationState()
    }
    catch(error){
        console.error("error ocurred at Register function at Authentication module")
        console.error(error)
        return Promise.resolve({ logging : null })
    }
}

export async function Logout(){
    try{
        await LogoutAPIcall()
        let auth = new Authentication({authenticated : false})
        return auth.setAuthenticationState()
    }
    catch(error){
        console.error("error ocurred at Logout function at Authentication module")
    }
}

export default Authentication