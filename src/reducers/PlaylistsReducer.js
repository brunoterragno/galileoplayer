import {
  PLAYLISTS_FETCH,
  PLAYLISTS_FETCH_SUCCESS,
  PLAYLISTS_FETCH_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  popularLists: [],
  myPlaylist: [],
  isLoading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_FETCH: {
      return { ...state, isLoading: true }
    }
    case PLAYLISTS_FETCH_SUCCESS: {
      const { popularPlaylists, myPlaylist } = action.payload
      return { ...state, popularPlaylists, myPlaylist, isLoading: false }
    }
    case PLAYLISTS_FETCH_FAIL: {
      return state
    }
    default:
      return state
  }
}
