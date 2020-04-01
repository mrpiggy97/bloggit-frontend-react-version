//import getPosts from 'services/PostServices/getPosts'
import getPosts from 'services/PostServices/__mocks__/getPosts'
import getPosts2 from 'services/PostServices/__mocks__/getPosts2'

const updatePosts = async (page) => {
    try {
        let response = await getPosts2(page)
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
        return Promise.resolve(newState)
    }
    
    catch (error) {
        console.log(error)
        console.log("error ocurred in HomeViewGetPage")
        let newState  ={
            fetchingStatus : {
                success : false,
                status : error.request.status
            }
        }

        return Promise.resolve(newState)
    }
}

export default updatePosts