import React, { Component } from 'react'
import { View } from 'react-native'
import { Audio } from 'expo'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Player from '../components/Player'
import SongList from '../components/SongList'
import {
  shufflePlaylist,
  nextPlaylistSong,
  favouritePlaylistSong,
  selectPlaylistSong,
  playPausePlaylistSong,
  playbackStatusUpdate
} from '../actions'

class Playlist extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync()
    }
  }

  onPlayPausePressed(id) {
    if (this.playbackInstance != null) {
      if (this.props.isPlaying) {
        this.playbackInstance.pauseAsync()
      } else {
        this.playbackInstance.playAsync()
      }

      this.props.playPausePlaylistSong()
    }
  }

  onSongPressed(id) {
    if (this.playbackInstance != null) {
      this.props.selectPlaylistSong(id)
      this.loadNewPlaybackInstance(this.props.shouldPlay)
    }
  }

  onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      playbackStatusUpdate({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? 1 : 0,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isLoading: status.positionMillis <= 0
      })
      if (status.didJustFinish && !status.isLooping) {
        this.props.nextPlaylistSong()
        this.updatePlaybackInstanceForIndex(true)
      }
    } else {
      if (status.error) {
        /* eslint-disable */
        console.log(`FATAL PLAYER ERROR: ${status.error}`)
      }
    }
  }

  loadNewPlaybackInstance(playing) {
    if (this.playbackInstance) {
      this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }
    const source = { uri: this.props.song.source }
    const initialStatus = {
      shouldPlay: playing,
      rate: this.props.rate,
      shouldCorrectPitch: this.props.shouldCorrectPitch,
      volume: this.props.volume,
      isMuted: this.props.muted,
      isLooping: false,
      isLoading: true
    }

    Audio.Sound.create(source, initialStatus, this.onPlaybackStatusUpdate).then(
      ({ sound, status }) => {
        this.playbackInstance = sound
        this.playbackInstance.playAsync()
      }
    )
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    this.loadNewPlaybackInstance(true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Player
          song={this.props.song}
          isPlaying={this.props.isPlaying}
          isLoading={this.props.isLoading}
          position={this.props.playbackInstancePosition}
          duration={this.props.playbackInstanceDuration}
          onPressFavorite={id => this.props.favouritePlaylistSong(id)}
          onPressNext={() => this.props.nextPlaylistSong()}
          onPressPlayPause={id => this.onPlayPausePressed(id)}
        />
        <SongList
          songs={this.props.songs}
          onSelect={id => this.onSongPressed(id)}
        />
      </View>
    )
  }
}

Playlist.propTypes = {
  song: PropTypes.object,
  songs: PropTypes.array,
  playbackInstancePosition: PropTypes.number,
  playbackInstanceDuration: PropTypes.number,
  shouldPlay: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isBuffering: PropTypes.bool,
  isLoading: PropTypes.bool,
  volume: PropTypes.number,
  rate: PropTypes.number,
  loopingType: PropTypes.number,
  shouldCorrectPitch: PropTypes.bool,
  shufflePlaylist: PropTypes.func,
  nextPlaylistSong: PropTypes.func,
  favouritePlaylistSong: PropTypes.func,
  selectPlaylistSong: PropTypes.func,
  playPausePlaylistSong: PropTypes.func,
  playbackStatusUpdate: PropTypes.func
}

const styles = {
  container: {
    flex: 1
  }
}

const mapStateToProps = ({ player }) => {
  return ({
    song,
    songs,
    playbackInstancePosition,
    playbackInstanceDuration,
    shouldPlay,
    isPlaying,
    isBuffering,
    isLoading,
    volume,
    rate,
    loopingType,
    shouldCorrectPitch
  } = Player)
}

const mapDispatchToProps = {
  shufflePlaylist,
  nextPlaylistSong,
  favouritePlaylistSong,
  selectPlaylistSong,
  playPausePlaylistSong,
  playbackStatusUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
