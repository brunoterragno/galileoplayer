import {
  PLAYLISTS_FETCH,
  PLAYLISTS_FETCH_SUCCESS,
  SELECT_PLAYLIST
} from '../actions/types'
import { popularPlaylists, myPlaylist, songs } from '../data'

export const fetchPlaylists = () => dispatch => {
  dispatch({ type: PLAYLISTS_FETCH })
  setTimeout(() => {
    dispatch({
      type: PLAYLISTS_FETCH_SUCCESS,
      payload: { popularPlaylists, myPlaylist }
    })
  }, 2000)
}

export const selectPlaylist = (id, title) => dispatch => {
  const song = songs[0]
  dispatch({
    type: SELECT_PLAYLIST,
    payload: {
      title,
      songs,
      song
    }
  })
}
