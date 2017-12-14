import {
  SELECT_PLAYLIST,
  SHUFFLE_PLAYLIST_SONGS,
  NEXT_PLAYLIST_SONG,
  FAVOURITE_PLAYLIST_SONG,
  SELECT_PLAYLIST_SONG,
  PLAY_PAUSE_PLAYLIST_SONG,
  PLAYBACK_STATUS_UPDATE
} from '../actions/types'

const INITIAL_STATE = {
  song: null,
  songs: null,
  playbackInstancePosition: null,
  playbackInstanceDuration: null,
  shouldPlay: false,
  isPlaying: false,
  isLoading: false,
  isBuffering: false,
  volume: 1.0,
  rate: 1.0,
  loopingType: 0,
  shouldCorrectPitch: true
}

export default (state = INITIAL_STATE, action) => {
  const findSongIndex = id => state.songs.findIndex(x => x.id === id)
  const getUpdatedSongs = (song, newProps = {}) =>
    state.songs.map(
      actualSong =>
        actualSong.id === song.id ? song : { ...actualSong, ...newProps }
    )

  switch (action.type) {
    case SELECT_PLAYLIST: {
      const { title, songs, song } = action.payload
      return { ...state, title, songs, song, isLoading: true }
    }
    case PLAY_PAUSE_PLAYLIST_SONG: {
      return { ...state, isPlaying: !state.isPlaying, isLoading: true }
    }
    case NEXT_PLAYLIST_SONG: {
      const songIndex = findSongIndex(state.song.id)
      const nextSong = state.songs[songIndex + 1]

      if (nextSong) return { ...state, song: nextSong, isLoading: true }

      return state
    }
    case FAVOURITE_PLAYLIST_SONG: {
      const songIndex = findSongIndex(state.song.id)
      const actualSong = state.songs[songIndex]
      const song = { ...actualSong, favorited: !actualSong.favorited }
      const songs = getUpdatedSongs(song)

      return {
        ...state,
        song,
        songs
      }
    }
    case SELECT_PLAYLIST_SONG: {
      const songIndex = findSongIndex(action.payload)
      const actualSong = state.songs[songIndex]

      if (actualSong.isPlaying) return state

      const song = { ...actualSong, isPlaying: !actualSong.isPlaying }
      const songs = getUpdatedSongs(song, { isPlaying: false })

      return {
        ...state,
        song,
        songs,
        isLoading: true
      }
    }
    case SHUFFLE_PLAYLIST_SONGS: {
      return state
    }
    case PLAYBACK_STATUS_UPDATE: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}
