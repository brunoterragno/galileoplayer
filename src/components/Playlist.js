import React from "react";
import { View, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";

const Playlist = () => (
  <View>
    <Button title="Now Playing" onPress={() => Actions.nowPlaying()} />
  </View>
);

export default Playlist;
