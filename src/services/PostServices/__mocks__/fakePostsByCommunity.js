import fillPageByCommunity from 'tests/utils/fillPageByCommunity'

function fakePostsByCommunity(page, community){
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

export default fakePostsByCommunity