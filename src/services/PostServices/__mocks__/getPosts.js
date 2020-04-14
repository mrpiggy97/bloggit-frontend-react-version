import { page1, page2, page3 } from 'tests/utils/fillPage'

const getPosts = (page) => {
    let currentPage

    switch (page) {
        case 1:
            currentPage = page1
            break;
        case 2:
            currentPage = page2
            break;
        case 3:
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