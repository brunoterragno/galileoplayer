import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Asset, Audio, Font, Video } from "expo";
import theme from "../theme";
import { playlist } from "../data";
import Player from "../components/Player";
import SongList from "../components/SongList";

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

class Playlist extends Component {
  constructor(props = { id, title }) {
    super(props);
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

  componentWillUnmount() {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
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

  _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance) {
      this.playbackInstance.unloadAsync();
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

    Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    ).then(({ sound, status }) => {
      this.playbackInstance = sound;
      this.playbackInstance.playAsync();
    });
  }

  _selectSong(id) {
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
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
    this._loadNewPlaybackInstance(true);
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
          onSelect={id => this._selectSong(id)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default Playlist;
