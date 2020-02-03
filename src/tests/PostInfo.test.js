import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import PostInfo from '../components/PostInfo'

const mockStore = configStore([])

let container = document.createElement("div")
document.body.appendChild(container)

describe('test suit for PostInfo component', () => {
    it('checks that component renders as expected', () => {
        let store = mockStore({
            state : {
                authenticated : false,
                username : null,
                userCommunities : null,
                profilePic : null,
                query : ''
            },
        })

        store.dispatch = jest.fn()

        let info = {
            owner : { username : 'testnuser', profile_pic : null},
            date : "12 april 2020",
            title : "title test",
            text : "test",
            communities : ["test"],
            likes : 1,
            liked : null,
            reported : null
        }

        let wrapper

        act(() => {
            render(
                <Provider store={store}>
                    <PostInfo info={info} isPreview={true}/>
                </Provider>,container
            )
        })

        expect(container.children.length).toBe(1)
    })
})