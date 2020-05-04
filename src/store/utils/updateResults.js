//for the mocked version we will be using fakePostsByCommunity because the concept is the same
//of course this limit the fake search to 3 posts and 3 querys but this is faster
import fakePostsByCommunity from 'services/PostServices/__mocks__/fakePostsByCommunity'
import searchPosts from 'services/PostServices/searchPosts'

let realApi = localStorage.getItem("REACT_APP_MODE") === "dev" ? fakePostsByCommunity : searchPosts

async function updateResults(page, query){
    let newState
    try{
        let response =  await realApi(page, query)
        newState = {
            posts : response.results,
            nextPage : response.next_page,
            previousPage : response.previousPage,
            authenticated : response.authenticated,
            fetchingStatus : {
                success : true
            }
        }
    }
    catch(error){
        console.log("error ocurred at updateResults util in store/utils")
        console.error(error)
        newState = {
            fetchingStatus : {
                success : false
            }
        }
    }

    return newState
}

export default updateResults