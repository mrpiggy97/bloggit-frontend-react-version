import { authenticateTokenInstance } from '../axiosInstances'

const likePost = (postUUID) => {
    return authenticateTokenInstance({
        method : "PUT",
        url : `posts/like-post/${postUUID}/`,
        data : null
    })
}

export default likePost