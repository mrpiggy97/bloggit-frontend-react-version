import getPostsByCommunity from 'services/PostServices/getPostsByCommunity'
import fakePostsByCommunity from 'services/PostServices/__mocks__/fakePostsByCommunity'

const realAPI = process.env.REACT_APP_MODE === "dev" ? fakePostsByCommunity : getPostsByCommunity

const updateCommunityPosts = async (page, community) => {
    let response
    let newState
    let mockedErrorCode = 404 // since this means url was not found
    try {
        response = await realAPI(page, community)
        newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true,
                error : null
            },
            fetchingPosts : false
        }    
    }
    
    catch (error) {
        console.log("error ocurred at updatePostsByCommunity module")
        console.log(error)
        newState = {
            fetchingStatus : {
                success : false,
                error : error
            },

            fetchingPosts : false
        }
    }
    return Promise.resolve(newState)
}

export default updateCommunityPosts