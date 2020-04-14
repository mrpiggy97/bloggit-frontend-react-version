import { fakePage1, fakePage2, fakePage3 } from 'tests/utils/fillPage'

function getPosts2(page){
    let currentPage
    switch(page){
        case 1:
            currentPage = fakePage1
        break
        case 2:
            currentPage = fakePage2
        break
        case 3:
            currentPage = fakePage3
        break
        default:
            currentPage = fakePage1
    }

    return Promise.resolve({
        data : currentPage,
        code : 200
    })
}

export default getPosts2