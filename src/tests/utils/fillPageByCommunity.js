import fillPage, { fakePost } from './fillPage'
import { emptyResultsPage } from './emptyResults'

let fakePost1 = { ...fakePost, communities : ["test1"] }
let fakePost2 = { ...fakePost, communities : ["test2"] }
let fakePost3 = { ...fakePost, communities : ["test3"] }

//give out three pages according to community, each with 10 posts and a different
//uuid
function fillPageByCommunity(community){
    let page1, page2, page3
    switch(community){
        case "test1":
            page1 = fillPage(2, null, 23, fakePost1)
            page2 = fillPage(3, 1, 7, fakePost1)
            page3 = fillPage(null, 2, 51, fakePost1)
        break

        case "test2":
            page1 = fillPage(2, null, 43, fakePost2)
            page2 = fillPage(3,  1, 1, fakePost2)
            page3 = fillPage(null, 2, 19, fakePost2)
        break

        case "test3":
            page1 = fillPage(2, null, 67, fakePost3)
            page2 = fillPage(3, 1, 6, fakePost3)
            page3 = fillPage(null, 2, 87, fakePost3)
        break

        default:
            page1 = emptyResultsPage
            page2 = emptyResultsPage
            page3 = emptyResultsPage
    }

    return { page1, page2, page3 }
}

export default fillPageByCommunity