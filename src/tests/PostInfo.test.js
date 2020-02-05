import React from 'react'
import { create, act } from 'react-test-renderer'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import PostInfo, { ConnectedPostInfo } from 'components/PostInfo'

const mockStore = configStore([])
jest.mock("services/PostServices/likePost")
jest.mock("services/PostServices/reportPost")

describe('test suit for PostInfo component', () => {

    let store
    let info
    let wrapper
    let instance
    let connectedComponent
    let titleProps = { className : 'post-title' }

    beforeEach(() => {
        store = mockStore({
            authenticated : false,
            username : null,
            userCommunities : null,
            profilePic : null,
            query : ''
        })

        store.dispatch = jest.fn()
        info = {
            owner : { username : 'testnuser', profile_pic : null},
            date : "12 april 2020",
            title : "title test",
            text : "test",
            communities : ["test"],
            likes : 1,
            liked : null,
            reported : null
        }

        act(() => {
            wrapper = create(
                <Provider store={store}>
                    <PostInfo info={info} isPreview={true}/>
                </Provider>
            )
        })

        act(() => {
            instance = wrapper.root
            connectedComponent = instance.findByType(ConnectedPostInfo)
            connectedComponent.findByProps(titleProps).props.onClick()
        })
    })

    afterEach(() => {
        store = null
        info = null
        wrapper = null
        instance = null
        connectedComponent = null
    })

    it('checks that component renders as expected', () => {
        expect(wrapper.toJSON()).toMatchSnapshot()
        expect(instance.findByType(ConnectedPostInfo).props.authenticated).toBe(false)
    })

    it('checks that store methods work as expected', async () => {
        let expectedPayload = {
            username : "mrpiggy97",
            profile_pic : null,
            token : "1234123msddadsd",
            user_communities : [],
            authenticated : true
        }

        let expectedType = "RESOLVE_USER_CREDENTIALS"

        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith({
            type : expectedType,
            payload : expectedPayload
        })
    })
})


describe('test methods that call an api', () => {

    let info
    let store
    let wrapper
    let instance
    let likeProps = { className : 'fa fa-thumbs-up inactive' }
    let likesProps = { className : 'likes' }
    let reportedProps = { className : 'report' }

    beforeEach(() => {
        info = {
            owner : { username : 'testinguser1', profile_pic : null },
            date : "12 april 2020",
            title : "this is the test title",
            text : "this is the test text",
            communities : ['test'],
            likes : 1,
            liked : false,
            reported : false 
        }

        store = mockStore({
            authenticated : true,
            username : 'testinguser2',
            profilePic : null,
            userCommunities : [],
            token : '23123123sadasd'
        })

        store.dispatch = jest.fn()
        //first we have to render component
        act(() => {
            wrapper = create(
                <Provider store={store}>
                    <PostInfo info={info} isPreview={true}/>
                </Provider>
            )
        })
        //then we can use instance to update component
        act(() => {
            instance = wrapper.root
            instance.findByProps(likeProps).props.onClick()
            instance.findByProps(reportedProps).props.onClick()
        })
    })

    afterEach(() => {
        info = null
        store = null
        wrapper = null
        instance = null
    })

    it('checks that like method works as expected', () => {
        expect(instance.findByProps(likesProps).children[0]).toBe("2")
        //trying to find the element should throw an error since
        //liked and reported are supposed to be false
        expect(() => instance.findByProps(likeProps)).toThrow()
        expect(() => instance.findByProps(reportedProps)).toThrow()
    })
})