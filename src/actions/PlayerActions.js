import {
  SHUFFLE_PLAYLIST_SONGS,
  NEXT_PLAYLIST_SONG,
  FAVOURITE_PLAYLIST_SONG,
  SELECT_PLAYLIST_SONG,
  PLAY_PAUSE_PLAYLIST_SONG,
  PLAYBACK_STATUS_UPDATE
} from '../actions/types'

export const shufflePlaylistSongs = () => {
  dispatch({ type: SHUFFLE_PLAYLIST_SONGS })
}

export const playPausePlaylistSong = () => {
  dispatch({ type: PLAY_PAUSE_PLAYLIST_SONG })
}

export const nextPlaylistSong = () => {
  dispatch({ type: NEXT_PLAYLIST_SONG })
}

export const selectPlaylistSong = id => {
  dispatch({ type: SELECT_PLAYLIST_SONG, payload: id })
}

export const favouritePlaylistSong = id => {
  dispatch({ type: FAVOURITE_PLAYLIST_SONG, payload: id })
}

export const playbackStatusUpdate = status => {
  dispatch({ type: PLAYBACK_STATUS_UPDATE, payload: status })
}
