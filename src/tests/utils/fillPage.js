//while it seems redudant to have page1, page2 and page3 when fakePage1
//fakePage2 and fakePage3 are available, these last pages only contain the same
//posts all with the same title, text, likes owner ect, while page1, page2,
//and page3 all have different title text and owner, this trying to tell which
//which data we are supposed to see

let page1 = {
    next_page : 2,
    previous_page : null,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the first page",
            text : "this is the text of the fist post in the first page",
            communities : ['test1'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : '3431213ealTTTTsdsakdldk'
        },

        {
            owner : { username : 'anotheruser1', profile_pic : null },
            date : "14 may 2020",
            title : "this is the title of the second post in the first page",
            text : "this is the text of the second post in the first  page",
            communities : ['test2'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : "123HHSD;k';k4"
        }
    ],

    count : 2,
    authenticated : false,
}


let page2 = {
    next_page : 3,
    previous_page : 1,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the second page",
            text : "this is the text of the first post in the second page",
            communities : ['test1'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : '34ealdsakdldk'
        },

        {
            owner : { username : 'anotheruser1', profile_pic : null },
            date : "14 may 2020",
            title : "this is the title of the second post in the second page",
            text : "this is the text of the second post in the second page",
            communities : ['test2'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : "123;kklj;k4"
        }
    ],

    count : 2,
    authenticated : false,
}


let page3 = {
    next_page : null,
    previous_page : 2,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the third page",
            text : "this is the text of the fist post in the third page",
            communities : ['test1'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : '3431213elllljlha1111122ldsakdldk'
        },

        {
            owner : { username : 'anotheruser1', profile_pic : null },
            date : "14 may 2020",
            title : "this is the title of the second post in the third page",
            text : "this is the text of the second post in the third page",
            communities : ['test2'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : "123;k';5555534k4"
        }
    ],

    count : 2,
    authenticated : false,
}

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

let fakePage1, fakePage2, fakePage3 = null

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

fakePage1 = fillPage(2, null, 3, fakePost)
fakePage2 = fillPage(3, 1, 44, fakePost)
fakePage3 = fillPage(null, 2, 67, fakePost)

export { fakePage1, fakePage2, fakePage3, fakePost, page1, page2, page3 }

export default fillPage