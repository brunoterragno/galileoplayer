import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  processColor,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Bar } from "react-native-progress";
import { Asset, Audio, Font, Video } from "expo";
import theme from "../theme";
import { playlist } from "../data";
import images from "../images";
import { millisToMinutesAndSeconds, keyExtractor } from "../utils";

class Playlist extends Component {
  constructor(props = { id, title }) {
    super(props);
    this.playbackInstance = null;
    this.state = {
      song: playlist[0],
      songs: playlist,
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
    };
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

  _onPlayPausePressed = id => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
      this.setState({ isPlaying: !this.state.isPlaying });
    }
  };

  _onSongPressed = () => {
    if (this.playbackInstance != null) {
      this.setState({ isLoading: true });
      this._loadNewPlaybackInstance(this.state.shouldPlay);
    }
  };

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isLoading: status.positionMillis <= 0
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _advanceIndex(forward) {
    console.log("_advanceIndex", forward);
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = { uri: this.state.song.source };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: false,
      isLoading: true
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );

    this.playbackInstance = sound;
    this.playbackInstance.playAsync();
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
    this._loadNewPlaybackInstance(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <Player
          song={this.state.song}
          isPlaying={this.state.isPlaying}
          isLoading={this.state.isLoading}
          position={this.state.playbackInstancePosition}
          duration={this.state.playbackInstanceDuration}
          onPressFavorite={id => this._changeFavoritedState(id)}
          onPressPlayPause={id => this._onPlayPausePressed(id)}
        />
        <SongList
          songs={this.state.songs}
          onSelect={id => {
            const songIndex = this.state.songs.findIndex(x => x.id === id);
            const actualSong = this.state.songs[songIndex];

            if (actualSong.isPlaying) return;

            this._onSongPressed();
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

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const calcProgress = (position, duration) => {
  if (!position || !duration) return 0;

  const totalSeconds = duration / 1000;
  const passedSeconds = position / 1000;
  const progress = passedSeconds * 1 / totalSeconds;

  return progress;
};
const Player = ({
  song,
  isPlaying,
  isLoading,
  duration,
  position,
  onPressFavorite,
  onPressPlayPause
}) => (
  <View style={styles.playerContainer}>
    <Card
      {...song}
      isPlaying={isPlaying}
      isLoading={isLoading}
      onPressFavorite={onPressFavorite}
      onPressPlayPause={onPressPlayPause}
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
);

const SongList = ({ songs, onSelect }) => (
  <View style={styles.songListContainer}>
    <FlatList
      data={songs}
      keyExtractor={keyExtractor}
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

const Card = ({
  id,
  image,
  title,
  subtitle,
  favorited,
  isPlaying,
  isLoading,
  onPressFavorite,
  onPressPlayPause
}) => (
  <View style={styles.card}>
    <Image source={image} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <View style={styles.cardControls}>
        <CardControlButton image={images.shuffle} onPress={() => {}} />
        <CardControlButton image={images.repeat} onPress={() => {}} />
        <CardControlButton
          image={favorited ? images.favorited : images.favorite}
          onPress={() => onPressFavorite(id)}
        />
        {isLoading ? (
          <ActivityIndicator color={theme.secondaryColor} size={"large"} />
        ) : (
          <CardControlButton
            accent
            image={isPlaying ? images.pause : images.play}
            onPress={() => onPressPlayPause(id)}
          />
        )}
        <CardControlButton image={images.playNext} onPress={() => {}} />
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
