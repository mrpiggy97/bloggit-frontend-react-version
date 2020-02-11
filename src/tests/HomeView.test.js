import React from 'react'
import { act, render } from '@testing-library/react'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import HomeView, { ConnectedHomeView } from 'views/HomeView'

const mockStore = configStore([])
jest.mock('services/PostServices/getPosts')