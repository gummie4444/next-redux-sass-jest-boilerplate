// Imports
import Immutable from 'immutable'

// App Imports
import {
    GET_TOP_REPOS_SUCCESS,
    GET_TOP_REPOS
  } from './homeActions'

// Initial State
const initialState = Immutable.fromJS({
  isLoading: false,
  lang: ''
})

// State
export default (state = initialState, action ) => {
  switch (action.type) {
    case GET_TOP_REPOS:
      return state.set('isLoading', true)

    case GET_TOP_REPOS_SUCCESS:
      return state.merge(
        Object.assign({}, action.payload, {
          isLoading: false,
          lang: action.lang
        })
      )

    default:
      return state
  }
}
