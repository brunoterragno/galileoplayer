import React, { Component } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import theme from '../theme'
import { keyExtractor } from '../utils'
import { fetchPlaylists, selectPlaylist } from '../actions'

class Library extends Component {
  componentDidMount() {
    this.props.fetchPlaylists()
  }

  onPress(id, title) {
    this.props.selectPlaylist(id, title)
    Actions.playlist({ id, title })
  }

  render() {
    return (
      <View style={styles.container}>
        <LibrarySection
          title="POPULAR"
          source={this.props.popularPlaylists}
          onPressCard={(id, title) => this.onPress(id, title)}
        />
        <LibrarySection
          title="MY PLAYLIST"
          source={this.props.myPlaylist}
          onPressCard={(id, title) => this.onPress(id, title)}
        />
        <LibrarySection
          title="NEW RELEASES"
          source={this.props.popularPlaylists}
          onPressCard={(id, title) => this.onPress(id, title)}
        />
      </View>
    )
  }
}

Library.propTypes = {
  isLoading: PropTypes.bool,
  popularPlaylists: PropTypes.array,
  myPlaylist: PropTypes.array,
  fetchPlaylists: PropTypes.func,
  selectPlaylist: PropTypes.func
}

const LibrarySection = ({ title, source, onPressCard }) => (
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
          onPress={onPressCard}
        />
      )}
    />
  </View>
)

LibrarySection.propTypes = {
  title: PropTypes.string,
  source: PropTypes.array,
  onPressCard: PropTypes.func
}

const LibraryCard = ({ id, image, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(id, title)}>
    <View>
      <Image source={image} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
)

LibraryCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func
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

const mapStateToProps = ({ playlists }) => {
  const { isLoading, popularPlaylists, myPlaylist } = playlists
  return { isLoading, popularPlaylists, myPlaylist }
}

const mapDispatchToProps = {
  fetchPlaylists,
  selectPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)
