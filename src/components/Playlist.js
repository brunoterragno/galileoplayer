import React from "react";
import { View, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";

const Playlist = ({ id }) => (
  <View>
    <Button title="Now Playing" onPress={() => Actions.nowPlaying()} />
    <Text>{id}</Text>
  </View>
);

export default Playlist;
