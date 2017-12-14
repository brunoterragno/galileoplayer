import React from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../theme'
import images from '../images'
import { keyExtractor } from '../utils'

const SongList = ({ songs, onSelect }) => (
  <View style={styles.songListContainer}>
    <FlatList
      data={songs}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => {
        return <SongListCard {...item} onSelect={onSelect} />
      }}
    />
  </View>
)

SongList.propTypes = {
  songs: PropTypes.array,
  onSelect: PropTypes.func
}

const SongListCard = ({
  id,
  image,
  title,
  subtitle,
  duration,
  isPlaying,
  onSelect
}) => (
  <TouchableOpacity onPress={() => onSelect(id)}>
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage}>
        {isPlaying && (
          <View style={styles.cardControlsButton}>
            <Image
              source={images.play}
              style={{ opacity: isPlaying ? 0.81 : 1 }}
            />
          </View>
        )}
      </Image>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.cardSubtitle}>{duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

SongListCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  duration: PropTypes.string,
  isPlaying: PropTypes.bool,
  onSelect: PropTypes.func
}

const styles = {
  songListContainer: {
    flex: 3,
    justifyContent: 'space-around',
    backgroundColor: theme.primaryColor
  },
  card: {
    flex: 3,
    flexDirection: 'row',
    padding: 10,
    height: 80
  },
  cardImage: {
    width: 60,
    height: 60
  },
  cardInfo: {
    flex: 1,
    margin: 10,
    marginRight: 0
  },
  cardControlsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.secondaryColor,
    opacity: 0.88,
    margin: 10
  },
  cardTitle: {
    color: theme.primaryTextColor,
    fontSize: 18
  },
  cardSubtitle: {
    color: theme.secondaryTextColor,
    fontSize: 14
  },
  centerContent: {
    justifyContent: 'center'
  }
}

export default SongList
