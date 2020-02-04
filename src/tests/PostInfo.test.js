import React from 'react'
import { create, act } from 'react-test-renderer'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import PostInfo, { ConnectedPostInfo } from '../components/PostInfo'

const mockStore = configStore([])

describe('test suit for PostInfo component', () => {

    let store
    let info
    let wrapper
    let instance

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
    })

    afterEach(() => {
        store = null
        info = null
        wrapper = null
        instance = null
    })

    it('checks that component renders as expected', () => {

        act(() => {
            wrapper = create(
                <Provider store={store}>
                    <PostInfo info={info} isPreview={true}/>
                </Provider>
            )
        })

        instance = wrapper.root
        expect(wrapper.toJSON()).toMatchSnapshot()
        expect(instance.findByType(ConnectedPostInfo).props.authenticated).toBe(false)
    })

    it('checks that store methods work as expected', async () => {
        wrapper = create(
            <Provider store={store}>
                <PostInfo info={info} isPreview={true}></PostInfo>
            </Provider>
        )

        instance = wrapper.root
        let expectedPayload = {
            username : "mrpiggy97",
            profile_pic : null,
            token : "1234123msddadsd",
            user_communities : [],
            authenticated : true
        }

        let expectedType = "RESOLVE_USER_CREDENTIALS"

        act(() => {
            let connectedComponent = instance.findByType(ConnectedPostInfo)
            connectedComponent.findByProps({ className : "post-title"}).props.onClick()            
        })

        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith({
            type : expectedType,
            payload : expectedPayload
        })
    })
})