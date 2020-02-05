const reportPost = (postUUID) => {
    return Promise.resolve({
        data : null,
        status : 200,
        uuid : postUUID//to pacify linter
    })
}

export default reportPost