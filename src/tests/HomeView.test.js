import React from 'react'
import { act, render } from '@testing-library/react'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import promise from 'redux-promise-middleware'

import HomeView, { ConnectedHomeView } from 'views/HomeView'

const middlewares = [promise]
const mockStore = configStore(middlewares)
jest.mock('services/PostServices/getPosts')

describe('initial test for HomeView view', () => {
    let store
    let wrapper
    let instance
    let container

    beforeEach(() => {
        store = mockStore({
            authenticated : false,
            username : null,
            token : null,
            userCommunities : null,
            profilePic : null,
            posts : [],
            nextPage : 0,
            previousPage : 0,
            fetchingPosts : false,
            fetchingStatus : {
                success : null,
                code : null
            }
        })

        store.dispatch = jest.fn()

        container = document.createElement("div")
        document.body.appendChild(container)

        act(() => {

            let { getByText } = render(
                <Provider store={store}>
                    <HomeView/>
                </Provider>, container
            )
        })
    })

    it('checks that view has been mounted correctly',  () => {
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
})