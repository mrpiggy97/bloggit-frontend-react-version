import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import HomeView from 'views/HomeView'
import { page1 } from 'tests/utils/dataByPage'
import { unauthenticatedStore } from 'tests/utils/storeMocks'
import createStore from 'tests/utils/storeMocks'

describe('initial test for HomeView view', () => {

    let mockedStoreWithPosts = createStore({
        ...unauthenticatedStore,
        posts : page1.results,
        nextPage : page1.next_page,
        previousPage : page1.previous_page,
    })
    mockedStoreWithPosts.dispatch = jest.fn()

    let unauthenticatedMockedStore = createStore({ ...unauthenticatedStore })
    unauthenticatedMockedStore.dispatch = jest.fn()

    it('checks that view has been mounted correctly', () => {
        let wrapper = render(
            <Provider store={unauthenticatedMockedStore}>
                <Router>
                    <Route render={(props) => <HomeView {...props}/>} />                    
                </Router>
            </Provider>
        )

        expect(wrapper.getByText('next')).toBeInTheDocument()
        expect(unauthenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
    })

    it('checks expected render given render with posts', () => {

        let wrapper = render(
            <Provider store={mockedStoreWithPosts}>
                <Router>
                    <Route render={(props) => <HomeView {...props} />} />
                </Router>
            </Provider>
        )

        expect(wrapper.getByText('next page')).toBeInTheDocument()
        expect(mockedStoreWithPosts.dispatch).toHaveBeenCalledTimes(0)
        fireEvent.click(wrapper.getByText("next page"))
        expect(mockedStoreWithPosts.dispatch).toHaveBeenCalledTimes(1)
    })
})