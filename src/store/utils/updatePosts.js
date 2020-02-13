//import getPosts from 'services/PostServices/getPosts'
import getPosts from 'services/PostServices/__mocks__/getPosts'

const updatePosts = async (page) => {
    try {
        let response = await getPosts(page)
        let newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true,
                status : response.status
            }
        }

        return newState
    }
    
    catch (error) {
        console.log(error)
        console.log("error ocurred in HomeViewGetPage")
        return {
            fetchingStatus : {
                success : false,
                status : error.request.status
            }
        }
    }
}

export default updatePosts