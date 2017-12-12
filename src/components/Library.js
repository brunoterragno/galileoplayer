import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import theme from '../theme'
import { popularList, myPlaylist } from '../data'
import { keyExtractor } from '../utils'

const Library = () => (
  <View style={styles.container}>
    <LibrarySection title="POPULAR" source={popularList} />
    <LibrarySection title="MY PLAYLIST" source={myPlaylist} />
    <LibrarySection
      title="NEW RELEASES"
      source={[].concat(popularList).reverse()}
    />
  </View>
)

const LibrarySection = ({ title, source }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      horizontal
      style={styles.cardsContainer}
      data={source}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <LibraryCard
          id={item.id}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
        />
      )}
    />
  </View>
)

LibrarySection.propTypes = {
  title: PropTypes.string,
  source: PropTypes.string
}

const LibraryCard = ({ id, image, title, subtitle }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => Actions.playlist({ id, title })}
  >
    <View>
      <Image source={image} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
)

LibraryCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.primaryColor
  },
  sectionContainer: {
    height: '40%',
    flex: 1
  },
  sectionTitle: {
    color: theme.primaryTextColor,
    fontSize: 18,
    marginLeft: 10,
    marginTop: 20
  },
  cardsContainer: {
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  cardTitle: {
    marginTop: 10,
    color: theme.primaryTextColor
  },
  cardSubtitle: {
    color: theme.secondaryTextColor
  }
}

export default Library
