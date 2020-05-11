import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, MemoryRouter } from 'react-router-dom'

import HomeView from 'views/HomeView'
import { fakePage1 } from 'tests/utils/fillPage'
import createStore, { unauthenticatedStore } from 'tests/utils/storeMocks'

describe('initial test for HomeView view', () => {

    let mockedStoreWithPosts = createStore({
        ...unauthenticatedStore,
        posts : fakePage1.results,
        nextPage : fakePage1.next_page,
        previousPage : fakePage1.previous_page,
    })
    mockedStoreWithPosts.dispatch = jest.fn()

    let unauthenticatedMockedStore = createStore({ ...unauthenticatedStore })
    unauthenticatedMockedStore.dispatch = jest.fn()

    it('checks that view has been mounted correctly', () => {
        let wrapper = render(
            <Provider store={unauthenticatedMockedStore}>
                <MemoryRouter initialEntries={["/"]}>
                    <Route exact path="/" render={(props) => <HomeView {...props}/>} />                    
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.getByText('next')).toBeInTheDocument()
        expect(unauthenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
    })

    it('checks expected render given render with posts', () => {

        let wrapper = render(
            <Provider store={mockedStoreWithPosts}>
                <MemoryRouter initialEntries={["/"]}>
                    <Route exact path="/" render={(props) => <HomeView {...props} />} />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.getByText('next page')).toBeInTheDocument()
        expect(mockedStoreWithPosts.dispatch).toHaveBeenCalledTimes(1)
        fireEvent.click(wrapper.getByText("next page"))
        expect(mockedStoreWithPosts.dispatch).toHaveBeenCalledTimes(2)
    })
})