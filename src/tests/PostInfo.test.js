import React from 'react'
import { create, act } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import configStore from 'redux-mock-store'
import promise from 'redux-mock-store'
import { BrowserRouter, Route } from 'react-router-dom'

import PostInfo, { ConnectedPostInfo } from 'components/PostInfo'
import createStore, { unauthenticatedStore, authenticatedStore } from './utils/storeMocks'

const mockStore = configStore([promise])
jest.mock("services/PostServices/likePost")
jest.mock("services/PostServices/reportPost")

const UnauthenticateStore = mockStore(unauthenticatedStore)

UnauthenticateStore.dispatch = jest.fn()

const AuthenticatedStore = mockStore(authenticatedStore)

AuthenticatedStore.dispatch = jest.fn()

describe('test suit for PostInfo component', () => {

    let info
    let wrapper
    let instance
    let connectedComponent

    beforeEach(() => {
        info = {
            owner : { username : 'testnuser', profile_pic : null},
            date : "12 april 2020",
            title : "title test",
            text : "test",
            communities : ["test"],
            likes : 1,
            liked : null,
            reported : null,
            uuid : '1239128wassdcasd'
        }

        act(() => {
            wrapper = create(
                <Provider store={UnauthenticateStore}>
                    <BrowserRouter>
                        <Route render={(props) => {
                            return <PostInfo {...props} info={info} isPreview={true}
                                    isAuthenticated={unauthenticatedStore.authenticated} />
                        }}/>
                    </BrowserRouter>
                </Provider>
            )
        })

        act(() => {
            instance = wrapper.root
        })
    })

    afterEach(() => {
        info = null
        wrapper = null
        instance = null
        connectedComponent = null
    })

    it('checks that component renders as expected', () => {
        expect(wrapper.toJSON()).toMatchSnapshot()
        expect(instance.findByType(ConnectedPostInfo).props.isAuthenticated).toBe(false)
    })
})


describe('test methods that call an api', () => {

    let info
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
            reported : false,
            uuid : 'asdasdmMMMMM'
        }

        //first we have to render component
        act(() => {
            wrapper = create(
                <Provider store={AuthenticatedStore}>
                    <BrowserRouter>
                        <Route render={(props) => {
                            return <PostInfo {...props} info={info} isPreview={true}
                                    isAuthenticated={true} />
                        }} />
                    </BrowserRouter>
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


describe('test the dom', () => {
    let wrapper = null
    let info = {
        date : "12 april 2020",
        owner : { username : 'test111', profile_pic : null },
        title : 'this is a title',
        text : 'this is the text',
        communities : ['test'],
        likes : 1,
        liked : null,
        reported : null
    }

    beforeEach(() => {

        wrapper = render(
            <Provider store={UnauthenticateStore}>
                <BrowserRouter>
                    <Route render={(props) => {
                        return <PostInfo {...props} info={info} isPreview={false}
                                isAuthenticated={unauthenticatedStore.authenticated}/>
                    }} />
                </BrowserRouter>
            </Provider>
        )
    })

    afterEach(() => {
        wrapper = null
    })

    it('checks no problem arises with the dom', () => {
        expect(wrapper.getByText(info.owner.username)).toBeInTheDocument()
    })
})