//import getPosts from 'services/PostServices/getPosts'
import getPosts from 'services/PostServices/__mocks__/getPosts'

const updatePosts = async (url) => {
    try {
        let response = await getPosts(url)
        let newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated
        }

        return newState
    }
    
    catch (error) {
        console.log(error)
        console.log("error ocurred in HomeViewGetPage")
    }
}

export default updatePosts