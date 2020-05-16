import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

import RenderPosts from 'views/RenderPosts'
import createStore, { authenticatedStore } from './utils/storeMocks'
import { fakePage1 } from './utils/fillPage'

let authenticatedMockedStore
beforeEach(() => {
    authenticatedMockedStore = createStore({
        ...authenticatedStore,
        posts : fakePage1.results,
        nextPage : fakePage1.next_page,
        previousPage : fakePage1.previous_page
    })

    authenticatedMockedStore.dispatch = jest.fn()    
})

afterEach(() => {
    authenticatedMockedStore = null
})


describe('check initial render of component as home view', () => {

    it('checks component renders as expected', () => {

        let wrapper

        act(() => {
            wrapper = render(
                <Provider store={authenticatedMockedStore}>
                    <MemoryRouter initialEntries={["/"]}>
                        <Route exact path="/" render={(props) => <RenderPosts {...props} />} />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(authenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
    })
})


describe('check initial render when component is used as search page', () => {

    it('checks component renders as expected', () => {
        let query = "test2"
        let wrapper = render(
            <Provider store={authenticatedMockedStore}>
                <MemoryRouter initialEntries={[`/posts/search/${query}`]}>
                    <Route exact path="/posts/search/:query" render={(props) => <RenderPosts {...props} />}/>
                </MemoryRouter>
            </Provider>
        )

        expect(authenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
        expect(wrapper.getByText("test2")).toBeInTheDocument()
    })
})


describe('check initial render when component is used a PostsByCommunity page', () => {
    it('check component renders as expected', () => {
        let query = "test3"
        let wrapper = render(
            <Provider store={authenticatedMockedStore}>
                <MemoryRouter initialEntries={[`/posts/${query}`]}>
                    <Route exact path="/posts/:query" render={(props) => <RenderPosts {...props} />} />
                </MemoryRouter>
            </Provider>
        )

        expect(authenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
        expect(wrapper.getByText("test3")).toBeInTheDocument()
    })
})