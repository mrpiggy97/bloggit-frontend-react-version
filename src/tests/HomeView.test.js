import React from 'react'
import { create,  act } from 'react-test-renderer'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import HomeView from 'views/HomeView'

const mockStore = configStore([])
jest.mock('services/PostServices/getPosts')

describe('check the basic functionality of the view', () => {

    let store
    let wrapper
    let instance
    let postsProps = { className : 'posts' }

    beforeEach(() => {
        store = mockStore({
            authenticated : true,
            username : "anotheruser2",
            profilePic : null,
            userCommunities : ['tet'],
            token : 'asdlkq3431123'
        })

        store.dispatch = jest.fn()

        act(() => {
            wrapper = create(
                <Provider store={store}>
                    <HomeView posts={[]}/>
                </Provider>
            )
        })

        act(() => {
            instance = wrapper.root
        })
    })

    afterEach(() => {
        store = null,
        wrapper = null
        instance = null
    })

    it('checks that component starts as expected', () => {
        //after being mounted view should make api call to get posts
        expect(instance.findByProps(postsProps).children.length).toBe(2)
        //this will test if component triggers action if api says that the user
        //token has expired and therefore we should modify the state of out store
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith({
            type : "RESOLVE_USER_CREDENTIALS",
            payload : {
                authenticated : false
            }
        })
    })
})


describe('test async methods', () => {
    let store
    let instance
    let wrapper
    let postsProps = { className : 'posts' }
    let postProps = { className : 'post-title'}
    let nextPageProps = { className : 'next-page-active' }

    beforeEach(() => {
        store = mockStore({
            authenticated : false,
            username : null,
            profilePic : null,
            userCommunities : null,
            token : '124;;l12m34'
        })
        store.dispatch = jest.fn()

        act(() => {
            wrapper = create(
                <Provider store={store}>
                    <HomeView posts={[]}/>
                </Provider>
            )
        })

        act(() => {
            instance = wrapper.root
        })
    })

    afterEach(() => {
        wrapper = null
        store = null
        instance = null

    })

    it('checks getNextPagePosts works as expected', () => {
        act(() => {
            instance.findByProps(nextPageProps).props.onClick()
        })

        let post = instance.findProps(postsProps).children[0]
        let postTitle = post.findByProps(postProps).children[0]
        let expectedTitle = "this is the title of the first post in the second page"
        expect(postTitle).toBe(expectedTitle)
    })
})