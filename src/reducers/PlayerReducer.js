import {
  NEXT_PLAYLIST_SONG,
  FAVOURITE_PLAYLIST_SONG,
  UNFAVOURITE_PLAYLIST_SONG,
  SHUFFLE_PLAYLIST_SONGS
} from '../actions/types'

const LOOPING_TYPE_ALL = 0

const INITIAL_STATE = {
  song: null,
  songs: null,
  playbackInstancePosition: null,
  playbackInstanceDuration: null,
  shouldPlay: false,
  isPlaying: false,
  isBuffering: false,
  isLoading: true,
  volume: 1.0,
  rate: 1.0,
  loopingType: LOOPING_TYPE_ALL,
  shouldCorrectPitch: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEXT_PLAYLIST_SONG: {
      return state
    }
    case FAVOURITE_PLAYLIST_SONG: {
      return state
    }
    case UNFAVOURITE_PLAYLIST_SONG: {
      return state
    }
    case SHUFFLE_PLAYLIST_SONGS: {
      return state
    }
    default:
      return state
  }
}
