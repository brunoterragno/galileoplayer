import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Bar } from "react-native-progress";
import theme from "../theme";
import { playlist } from "../data";
import images from "../images";

class Playlist extends Component {
  state = {
    song: playlist[0],
    songs: playlist
  };

  constructor(props = { id, title }) {
    super(props);
  }

  _changeFavoritedState(id) {
    const songIndex = this.state.songs.findIndex(x => x.id === id);
    const actualSong = this.state.songs[songIndex];
    const song = { ...actualSong, favorited: !actualSong.favorited };

    this.setState({
      song,
      songs: [
        ...this.state.songs.map(
          actualSong => (actualSong.id === song.id ? song : actualSong)
        )
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Player
          song={this.state.song}
          onPressFavorite={id => this._changeFavoritedState(id)}
        />
        <SongList
          songs={this.state.songs}
          onSelect={id => {
            const songIndex = this.state.songs.findIndex(x => x.id === id);
            const actualSong = this.state.songs[songIndex];

            if (actualSong.isPlaying) return;

            const song = { ...actualSong, isPlaying: !actualSong.isPlaying };
            this.setState({
              song,
              songs: [
                ...this.state.songs.map(
                  actualSong =>
                    actualSong.id === song.id
                      ? song
                      : { ...actualSong, isPlaying: false }
                )
              ]
            });
          }}
        />
      </View>
    );
  }
}

const Player = ({ song, onPressFavorite }) => (
  <View style={styles.playerContainer}>
    <Card {...song} onPressFavorite={onPressFavorite} />
    <View style={styles.cardSongStatusBar}>
      <Text style={styles.cardSongStatusBarText}>01:22</Text>
      <View style={styles.cardSongStatusBarProgress}>
        <Bar
          width={null}
          progress={0.5}
          color={theme.secondaryColor}
          borderColor={theme.primaryColor}
          unfilledColor={theme.tertiaryColor}
        />
      </View>
      <Text style={styles.cardSongStatusBarText}>{song.duration}</Text>
    </View>
  </View>
);

const _keyExtractor = (item, index) => item.id;
const SongList = ({ songs, onSelect }) => (
  <View style={styles.songListContainer}>
    <FlatList
      data={songs}
      keyExtractor={_keyExtractor}
      renderItem={({ item }) => <SongListCard {...item} onSelect={onSelect} />}
    />
  </View>
);

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
      onSelect(id);
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
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.cardSubtitle}>{duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Card = ({ id, image, title, subtitle, favorited, onPressFavorite }) => (
  <View style={styles.card}>
    <Image source={image} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <View style={styles.cardControls}>
        <CardControlButton image={images.shuffle} />
        <CardControlButton image={images.repeat} />
        <CardControlButton
          image={favorited ? images.favorited : images.favorite}
          onPress={() => onPressFavorite(id)}
        />
        <CardControlButton image={images.play} accent />
        <CardControlButton image={images.playNext} />
      </View>
    </View>
  </View>
);

const CardControlButton = ({ image, accent, onPress }) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={[
        styles.cardControlsButton,
        { backgroundColor: accent ? theme.secondaryColor : theme.primaryColor }
      ]}
    >
      <Image source={image} />
    </View>
  </TouchableOpacity>
);

const styles = {
  container: {
    flex: 1
  },
  playerContainer: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: theme.primaryColor
  },
  songListContainer: {
    flex: 3,
    justifyContent: "space-around",
    backgroundColor: theme.primaryColor
  },
  card: {
    flex: 3,
    flexDirection: "row",
    padding: 10
  },
  cardInfo: {
    flex: 1,
    margin: 10,
    marginRight: 0
  },
  cardControls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardControlsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
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
  },
  cardTitle: {
    color: theme.primaryTextColor,
    fontSize: 18
  },
  cardSubtitle: {
    color: theme.secondaryTextColor,
    fontSize: 14
  }
};

export default Playlist;
