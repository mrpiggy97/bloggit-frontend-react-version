

let fakePost = {
    owner : { username : 'fakeuser14234', profilePic : null },
    date : "12 april 2020",
    title : "this is the title",
    text : "this is the text",
    communities : ["test1"],
    likes : 1,
    liked : null,
    reported : null,
    uuid : null
}

function fillPage(nextPage, previousPage, id, fakedPost) {
    //fill results with 5 versions of the same post, this is exactly the
    //data the api would give us

    let results = []
    for(let i=0; i < 5; i++){
        let post = { ...fakedPost, uuid : i + id }
        results.push(post)
    }

    let page = {
        results : results,
        count : results.length,
        next_page : nextPage,
        previous_page : previousPage,
        authenticated : window.localStorage.getItem('bloggit_token') ? true : false
    }

    return page
}

let fakePage1 = fillPage(2, null, 3, fakePost)
let fakePage2 = fillPage(3, 1, 44, fakePost)
let fakePage3 = fillPage(null, 2, 67, fakePost)

export { fakePage1, fakePage2, fakePage3, fakePost }

export default fillPage