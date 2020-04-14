import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore, { authenticatedStore, unauthenticatedStore } from 'tests/utils/storeMocks'

import PostByCommunity from 'views/PostsByCommunity'


const AuthenticatedMockedStore = createStore({ ...authenticatedStore })
const UnAuthenticatedMockedStore = createStore({ ...unauthenticatedStore })

AuthenticatedMockedStore.dispatch = jest.fn()
UnAuthenticatedMockedStore.dispatch = jest.fn()

//doesn't really matter if has an authenticated user or not
describe('initial test', () => {
    let wrapper = render(
        <Provider store={UnAuthenticatedMockedStore}>
            <MemoryRouter initialEntries={["/posts/test1"]}>
                <Route path="/posts/:community" render={(props) => <PostByCommunity {...props} />} />
            </MemoryRouter>`
        </Provider>
    )
    
    it('checks initial render works without errors', () => {
        expect(wrapper.getByText("test1")).toBeInTheDocument()
        expect(UnAuthenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
        fireEvent.click(wrapper.getByText("next page"))
        expect(UnAuthenticatedMockedStore.dispatch).toHaveBeenCalledTimes(1)
    })
})