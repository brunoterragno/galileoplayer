import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Player from '../components/Player'
import SongList from '../components/SongList'
import {
  shufflePlaylistSongs,
  nextPlaylistSong,
  favouritePlaylistSong,
  selectPlaylistSong,
  playPausePlaylistSong,
  playbackStatusUpdate
} from '../actions'

class Playlist extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Player
          song={this.props.song}
          isPlaying={this.props.isPlaying}
          isLoading={this.props.isLoading}
          position={this.props.playbackInstancePosition}
          duration={this.props.playbackInstanceDuration}
          onPlaybackStatusUpdate={this.props.playbackStatusUpdate}
          onPressShuffle={() => this.props.shufflePlaylistSongs()}
          onPressNext={() => this.props.nextPlaylistSong()}
          onPressFavorite={id => this.props.favouritePlaylistSong(id)}
          onPressPlayPause={id => this.props.playPausePlaylistSong(id)}
        />
        <SongList
          songs={this.props.songs}
          song={this.props.song}
          onSelect={id => this.props.selectPlaylistSong(id)}
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
  shufflePlaylistSongs: PropTypes.func,
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
  const {
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
  } = player

  return {
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
  }
}

const mapDispatchToProps = {
  shufflePlaylistSongs,
  nextPlaylistSong,
  favouritePlaylistSong,
  selectPlaylistSong,
  playPausePlaylistSong,
  playbackStatusUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
