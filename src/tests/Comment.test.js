import React from 'react'
import configStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react'
import { act, create } from 'react-test-renderer'
import { Provider } from 'react-redux'

import Comment, { ConnectedComment } from '../components/comment'

const mockedStore = configStore([])
let unauthenticatedStore = mockedStore({
    authenticated : false,
    posts : [],
    token : null,
    username : null,
    profilePic : null,
    user_communities : null,
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : false,
    fetchingStatus : {
        code : null,
        success : null
    }
})

unauthenticatedStore.dispatch = jest.fn()


let authenticatedStore = mockedStore({
    authenticated : true,
    token : 'qe12;lk3kl324',
    username : 'madara',
    profilePic : null,
    user_communities : [],
    nextPage : 0,
    previousPage : 0,
    fetchingPosts : false,
    fetchingStatus : {
        code : null,
        success : null
    }
})

authenticatedStore.dispatch = jest.fn()

describe('test render with authenticated user', () => {
    let info = {
        owner : { username : 'testingsuser', profile_pic : null },
        date : "12 april 2020",
        text : "this is the comment text",
        likes : 1,
        liked : null,
        reported : null,
        parent_comment : null,
        has_parent : false,
        is_original : true
    }

    let info2 = { ...info, liked : false, reported : false }

    it('checks that component renders normally', () => {
        let wrapper = render(
            <Provider store={unauthenticatedStore}>
                <Comment info={info}/>
            </Provider>
        )

        expect(wrapper.getByText(info.text)).toBeInTheDocument()
        fireEvent.click(wrapper.getByText("like"))
        expect(wrapper.getByText("1")).toBeInTheDocument()
    })

    it("checks component render with authenticated user", () => {
        let wrapper2 = render(
            <Provider store={authenticatedStore}>
                <Comment info={info2}/>
            </Provider>
        )

        expect(wrapper2.getByText("likee")).toBeInTheDocument()
    })
})