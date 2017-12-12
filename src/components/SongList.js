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
      renderItem={({ item }) => <SongListCard {...item} onSelect={onSelect} />}
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
  <TouchableOpacity
    onPress={() => {
      onSelect(id)
    }}
  >
    <View style={[styles.card, { height: 80 }]}>
      <Image source={image} style={{ width: 60, height: 60 }}>
        {isPlaying && (
          <View
            style={[
              styles.cardControlsButton,
              {
                backgroundColor: theme.secondaryColor,
                opacity: 0.88,
                margin: 10
              }
            ]}
          >
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
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.cardSubtitle}>{duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

SongListCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.object,
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
    padding: 10
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
    alignItems: 'center'
  },
  cardTitle: {
    color: theme.primaryTextColor,
    fontSize: 18
  },
  cardSubtitle: {
    color: theme.secondaryTextColor,
    fontSize: 14
  }
}

export default SongList
