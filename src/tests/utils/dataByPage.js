export let page1 = {
    next_page : 2,
    previous_page : null,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the first page",
            text : "this is the text of the fist post in the first page",
            communities : ['test'],
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
            communities : ['test'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : "123HHSD;k';k4"
        }
    ],

    count : 2,
    authenticated : false,
}


export let page2 = {
    next_page : 3,
    previous_page : 1,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the second page",
            text : "this is the text of the first post in the second page",
            communities : ['test'],
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
            communities : ['test'],
            likes : 1,
            liked : null,
            reported : null,
            uuid : "123;kklj;k4"
        }
    ],

    count : 2,
    authenticated : false,
}


export let page3 = {
    next_page : null,
    previous_page : 2,
    results : [
        {
            owner : { username : 'testin123123', profile_pic : null },
            date : "14 april 2022",
            title : "this is the title of the first post in the third page",
            text : "this is the text of the fist post in the third page",
            communities : ['test'],
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
            communities : ['test'],
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
    communities : ["test"],
    likes : 1,
    liked : null,
    reported : null,
    uuid : null
}

let fakePage1, fakePage2, fakePage3 = null

function fillPage(start, limit) {
    //fill results with 20 versions of the same post
    if(start < 0 || limit > 100){
        return null
    }

    let results = []
    for(let i=start; i < limit; i++){
        let post = { ...fakePost, uuid : i }
        results.push(post)
    }

    let page = {
        results : results,
        count : results.length,
    }

    return page
}

fakePage1 = fillPage(0, 10)
fakePage2 = fillPage(0, 10)
fakePage3 = fillPage(0, 10)

fakePage1.next_page = 2
fakePage1.previous_page = null

fakePage2.next_page = 3
fakePage2.previous_page = 1

fakePage3.next_page = null
fakePage3.previous_page = 2

export { fakePage1, fakePage2, fakePage3 }