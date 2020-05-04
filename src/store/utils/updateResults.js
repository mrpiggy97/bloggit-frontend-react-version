//for the mocked version we will be using fakePostsByCommunity because the concept is the same
//of course this limit the fake search to 3 posts and 3 querys but this is faster
import fakePostsByCommunity from 'services/PostServices/__mocks__/fakePostsByCommunity'
import searchPosts from 'services/PostServices/searchPosts'

let realApi = process.env.REACT_APP_MODE === "dev" ? fakePostsByCommunity : searchPosts

const updateResults = async (page, query) => {
    let newState
    let response
    try{
        response =  await realApi(page, query)
        newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true
            },
            fetchingPosts : false
        }
    }
    catch(error){
        console.log("error ocurred at updateResults util in store/utils")
        console.error(error)
        newState = {
            fetchingStatus : {
                success : false
            },
            fetchingPosts : false
        }
    }

    return Promise.resolve(newState)
}

export default updateResults