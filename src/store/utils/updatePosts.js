import getPosts from 'services/PostServices/getPosts'
import getPosts2 from 'services/PostServices/__mocks__/getPosts2'

const realAPI = process.env.REACT_APP_MODE === "dev" ? getPosts2 : getPosts

const updatePosts = async (page) => {
    try {
        let response = await realAPI(page)
        let newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true,
            }
        }
        return Promise.resolve(newState)
    }
    
    catch (error) {
        console.log(error)
        console.log("error ocurred in HomeViewGetPage")
        let newState  ={
            fetchingStatus : {
                success : false,
            }
        }

        return Promise.resolve(newState)
    }
}

export default updatePosts