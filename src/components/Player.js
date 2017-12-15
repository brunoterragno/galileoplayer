import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Audio } from 'expo'
import { Bar } from 'react-native-progress'
import PropTypes from 'prop-types'
import theme from '../theme'
import { millisToMinutesAndSeconds } from '../utils'
import Card from '../components/Card'

const calcProgress = (position, duration) => {
  if (!position || !duration) return 0

  const totalSeconds = duration / 1000
  const passedSeconds = position / 1000
  const progress = passedSeconds * 1 / totalSeconds

  return progress
}

class Player extends Component {
  constructor(props) {
    super(props)
    this.playbackInstance = null
  }

  componentWillUnmount() {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song.title !== this.props.song.title) {
      this.loadNewPlaybackInstance(true, nextProps.song)
    }
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    this.loadNewPlaybackInstance(true, this.props.song)
  }

  onPlayPausePressed(id) {
    if (this.playbackInstance != null) {
      if (this.props.isPlaying) {
        this.playbackInstance.pauseAsync()
      } else {
        this.playbackInstance.playAsync()
      }

      this.props.onPressPlayPause()
    }
  }

  onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      this.props.onPlaybackStatusUpdate({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isLoading: status.positionMillis <= 0,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? 1 : 0,
        shouldCorrectPitch: status.shouldCorrectPitch
      })
      if (status.didJustFinish && !status.isLooping) {
        this.props.onPressNext()
      }
    } else {
      if (status.error) {
        /* eslint-disable */
        console.log(`FATAL PLAYER ERROR: ${status.error}`)
      }
    }
  }

  loadNewPlaybackInstance(playing, song) {
    if (this.playbackInstance) {
      this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }
    if (song) {
      const source = { uri: song.source }
      const initialStatus = {
        shouldPlay: playing,
        rate: this.props.rate,
        shouldCorrectPitch: this.props.shouldCorrectPitch,
        volume: this.props.volume,
        isMuted: this.props.muted,
        isLooping: false,
        isLoading: true
      }

      Audio.Sound.create(
        source,
        initialStatus,
        this.onPlaybackStatusUpdate.bind(this)
      ).then(({ sound, status }) => {
        if (song.title === this.props.song.title) {
          this.playbackInstance = sound
          this.playbackInstance.playAsync()
        } else {
          sound.unloadAsync()
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.playerContainer}>
        <Card
          {...this.props.song}
          isPlaying={this.props.isPlaying}
          isLoading={this.props.isLoading}
          onPressFavorite={this.props.onPressFavorite}
          onPressPlayPause={() => this.onPlayPausePressed()}
          onPressNext={this.props.onPressNext}
          onPressShuffle={this.props.onPressShuffle}
        />
        <View style={styles.cardSongStatusBar}>
          <Text style={styles.cardSongStatusBarText}>
            {millisToMinutesAndSeconds(this.props.position)}
          </Text>
          <View style={styles.cardSongStatusBarProgress}>
            <Bar
              width={null}
              progress={calcProgress(this.props.position, this.props.duration)}
              color={theme.secondaryColor}
              borderColor={theme.primaryColor}
              unfilledColor={theme.tertiaryColor}
            />
          </View>
          <Text style={styles.cardSongStatusBarText}>
            {millisToMinutesAndSeconds(this.props.duration)}
          </Text>
        </View>
      </View>
    )
  }
}

Player.propTypes = {
  song: PropTypes.object,
  isPlaying: PropTypes.bool,
  isLoading: PropTypes.bool,
  duration: PropTypes.number,
  position: PropTypes.number,
  onPlaybackStatusUpdate: PropTypes.func,
  onPressFavorite: PropTypes.func,
  onPressPlayPause: PropTypes.func,
  onPressNext: PropTypes.func,
  onPressShuffle: PropTypes.func
}

const styles = {
  playerContainer: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: theme.primaryColor
  },
  cardSongStatusBar: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardSongStatusBarText: {
    color: theme.secondaryTextColor
  },
  cardSongStatusBarProgress: {
    flex: 1,
    margin: 10
  }
}

export default Player
