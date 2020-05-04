import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import createStore, { unauthenticatedStore, authenticatedStore } from './utils/storeMocks'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Results from 'views/Results'
import { fakePage1, fakePage2 } from './utils/fillPage'

//lets pretend the results from query give us the results from fakePage1 and fakePage2


const mockedAuthenticatedStore = createStore({
    ...authenticatedStore,
    posts : fakePage1.results,
    nextPage : fakePage1.next_page,
    previousPage : fakePage1.previous_page,
})

const mockedUnAuthenticatedStore = createStore({
    ...unauthenticatedStore,
    posts : fakePage2.results,
    nextPage : fakePage2.next_page,
    previousPage : fakePage2.previous_page
})

mockedAuthenticatedStore.dispatch = jest.fn()
mockedUnAuthenticatedStore.dispatch = jest.fn()

describe("initial test", () => {

    it('checks initial render', () => {
        let query = "test1"
        let wrapper = render(
            <Provider store={mockedUnAuthenticatedStore}>
                <MemoryRouter initialEntries={[`/posts/search/${query}`]}>
                    <Route path="/posts/search/:query" render={(props) => <Results {...props} />} />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.click(wrapper.getByText("next page"))
        expect(mockedUnAuthenticatedStore.dispatch).toHaveBeenCalledTimes(1)
        expect(wrapper.getByText("results for test1")).toBeInTheDocument()
    })
})