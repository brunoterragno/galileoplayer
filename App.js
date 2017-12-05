import React from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Library from "./src/components/Library";
import Playlist from "./src/components/Playlist";
import theme from "./src/theme";

const App = () => (
  <Router>
    <Stack
      key="root"
      navigationBarStyle={styles.navigationBar}
      titleStyle={styles.title}
      tintColor={theme.primaryTextColor}
    >
      <Scene key="library" component={Library} title="Library" />
      <Scene key="playlist" component={Playlist} title="Playlist" />
    </Stack>
  </Router>
);

const styles = {
  navigationBar: {
    backgroundColor: theme.primaryColor
  },
  title: {
    color: theme.primaryTextColor
  }
};
export default App;
