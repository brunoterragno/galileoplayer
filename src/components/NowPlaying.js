import React from "react";
import { View, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";

const NowPlaying = () => (
  <View>
    <Button
      title="Library"
      onPress={() => Actions.library({ type: "reset" })}
    />
  </View>
);

export default NowPlaying;
