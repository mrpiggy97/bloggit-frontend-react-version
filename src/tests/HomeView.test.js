import React from 'react'
import promise from 'redux-promise-middleware'
import configStore from 'redux-mock-store'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'


import HomeView from 'views/HomeView'
import { page1 } from 'tests/utils/dataByPage'


const middlewares = [promise]
const mockStore = configStore(middlewares)

describe('initial test for HomeView view', () => {

    let store = mockStore({
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

    let store2 = mockStore({
        authenticated : false,
        username : null,
        token : null,
        userCommunities : null,
        profilePic : null,
        posts : page1.results,
        nextPage : page1.next_page,
        previousPage : page1.previous_page,
        fetchingPosts : false,
        fetchingStatus : {
            success : null,
            code : null
        }
    })

    store2.dispatch = jest.fn()

    it('checks that view has been mounted correctly', () => {

        let wrapper = render(
            <Provider store={store}>
                <HomeView/>
            </Provider>
        )

        expect(wrapper.getByText('next')).toBeInTheDocument()
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })

    it('checks expected render given render with posts', () => {

        let wrapper = render(
            <Provider store={store2}>
                <HomeView/>
            </Provider>
        )
        expect(wrapper.getByText('next page')).toBeInTheDocument()
        expect(store2.dispatch).toHaveBeenCalledTimes(0)
        fireEvent.click(wrapper.getByText("next page"))
        expect(store2.dispatch).toHaveBeenCalledTimes(1)
    })
})