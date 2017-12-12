import {
  PLAYLISTS_FETCH,
  PLAYLISTS_FETCH_SUCCESS,
  PLAYLISTS_FETCH_FAIL,
  SELECT_PLAYLIST
} from '../actions/types'

const INITIAL_STATE = {
  popularList: [],
  myPlaylist: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLISTS_FETCH: {
      return state
    }
    case PLAYLISTS_FETCH_SUCCESS: {
      return state
    }
    case PLAYLISTS_FETCH_FAIL: {
      return state
    }
    case SELECT_PLAYLIST: {
      return state
    }
    default:
      return state
  }
}
