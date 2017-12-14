import React from 'react'
import { View, Text } from 'react-native'
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

const Player = ({
  song,
  isPlaying,
  isLoading,
  duration,
  position,
  onPressFavorite,
  onPressPlayPause,
  onPressNext
}) => (
  <View style={styles.playerContainer}>
    <Card
      {...song}
      isPlaying={isPlaying}
      isLoading={isLoading}
      onPressFavorite={onPressFavorite}
      onPressPlayPause={onPressPlayPause}
      onPressNext={onPressNext}
    />
    <View style={styles.cardSongStatusBar}>
      <Text style={styles.cardSongStatusBarText}>
        {millisToMinutesAndSeconds(position)}
      </Text>
      <View style={styles.cardSongStatusBarProgress}>
        <Bar
          width={null}
          progress={calcProgress(position, duration)}
          color={theme.secondaryColor}
          borderColor={theme.primaryColor}
          unfilledColor={theme.tertiaryColor}
        />
      </View>
      <Text style={styles.cardSongStatusBarText}>
        {millisToMinutesAndSeconds(duration)}
      </Text>
    </View>
  </View>
)

Player.propTypes = {
  song: PropTypes.object,
  isPlaying: PropTypes.bool,
  isLoading: PropTypes.bool,
  duration: PropTypes.number,
  position: PropTypes.number,
  onPressFavorite: PropTypes.func,
  onPressPlayPause: PropTypes.func,
  onPressNext: PropTypes.func
}

const styles = {
  playerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.primaryColor
  },
  cardSongStatusBar: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
