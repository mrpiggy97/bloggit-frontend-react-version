import getPostsByCommunity from 'services/PostServices/getPostsByCommunity'

const updateCommunityPosts = async (page, community) => {
    let response
    let newState
    try {
        response = await getPostsByCommunity(page, community)
        newState = {
            posts : response.data.posts,
            nextPage : response.data.nextPage,
            previousPage : response.data.previousPage,
            authenticated : response.data.authenticated,
            fetchingStatus : {
                success : true,
                code : response.data.status
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
                code : error.request.status
            },

            fetchingPosts : false
        }
    }

    return Promise.resolve(newState)
}

export default updateCommunityPosts