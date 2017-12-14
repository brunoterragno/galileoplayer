import {
  SHUFFLE_PLAYLIST_SONGS,
  NEXT_PLAYLIST_SONG,
  FAVOURITE_PLAYLIST_SONG,
  SELECT_PLAYLIST_SONG,
  PLAY_PAUSE_PLAYLIST_SONG,
  PLAYBACK_STATUS_UPDATE
} from '../actions/types'

export const shufflePlaylistSongs = () => dispatch => {
  dispatch({ type: SHUFFLE_PLAYLIST_SONGS })
}

export const playPausePlaylistSong = () => dispatch => {
  dispatch({ type: PLAY_PAUSE_PLAYLIST_SONG })
}

export const nextPlaylistSong = () => dispatch => {
  dispatch({ type: NEXT_PLAYLIST_SONG })
}

export const selectPlaylistSong = id => dispatch => {
  dispatch({ type: SELECT_PLAYLIST_SONG, payload: id })
}

export const favouritePlaylistSong = id => dispatch => {
  dispatch({ type: FAVOURITE_PLAYLIST_SONG, payload: id })
}

export const playbackStatusUpdate = status => dispatch => {
  dispatch({ type: PLAYBACK_STATUS_UPDATE, payload: status })
}
