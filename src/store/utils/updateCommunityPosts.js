import getPostsByCommunity from 'services/PostServices/getPostsByCommunity'
import fakePostsByCommunity from 'services/PostServices/__mocks__/fakePostsByCommunity'

let realAPI = process.env.REACT_APP_MODE === "dev" ? fakePostsByCommunity : getPostsByCommunity

const updateCommunityPosts = async (page, community) => {
    let response
    let newState
    try {
        response = await realAPI(page, community)
        newState = {
            posts : response.data.results,
            nextPage : response.data.next_page,
            previousPage : response.data.previous_page,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true,
            },
        }    
    }
    
    catch (error) {
        console.log("error ocurred at updateCommunityPosts module in store utils directory")
        console.log(error)
        newState = {
            fetchingStatus : {
                success : false,
            },
        }
    }
    return Promise.resolve(newState)
}

export default updateCommunityPosts