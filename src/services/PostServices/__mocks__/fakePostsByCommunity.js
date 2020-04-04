import { fakePost, fillPage } from 'tests/utils/dataByPage'

let fakePost1 = { ...fakePost, communities : ["test1"] }
let fakePost2 = { ...fakePost, communities : ["test2"] }
let fakePost3 = { ...fakePost, communities : ["test3"] }


function fillPageByCommunity(community){
    let page1, page2, page3
    switch(community){
        case "test1":
            page1 = fillPage(10, 2, null, 23, fakePost1)
            page2 = fillPage(10, 3, 1, 7, fakePost1)
            page3 = fillPage(10, null, 2, 51, fakePost1)
        break

        case "test2":
            page1 = fillPage(10, 2, null, 43, fakePost2)
            page2 = fillPage(10, 3,  1, 1, fakePost2)
            page3 = fillPage(10, null, 2, 19, fakePost2)
        break

        case "test3":
            page1 = fillPage(10, 2, null, 67, fakePost3)
            page2 = fillPage(10, 3, 1, 6, fakePost3)
            page3 = fillPage(10, null, 2, 87, fakePost3)
        break

        default:
            page1 = null
            page2 = null
            page3 = null
    }

    page1.community = community
    page2.community = community
    page3.community = community

    return { page1, page2, page3 }
}

function getPostsByCommunity(page, community){
    let { page1, page2, page3 } = fillPageByCommunity(community)
    let currentPage
    switch(page){
        case 1:
            currentPage = page1
        break

        case 2:
            currentPage = page2
        break

        case 3:
            currentPage = page3
        break

        default:
            currentPage = page1
    }

    return Promise.resolve({
        data : currentPage,
        status : 200,
    })
}

export default getPostsByCommunity