import { page1, page2, page3 } from 'tests/utils/dataByPage'

const getPosts = (url) => {
    let currentPage

    switch (url) {
        case `posts/?page=${1}`:
            currentPage = page1
            break;
        case `posts/?page=${2}`:
            currentPage = page2
            break;
        case `posts/?page=${3}`:
            currentPage = page3;
            break;
    
        default:
            currentPage = page1
            break;
    }

    return Promise.resolve({
        data : currentPage,
        status : 200
    })
}

export default getPosts