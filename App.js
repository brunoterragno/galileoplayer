import React, { Component } from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers'
import Library from './src/components/Library'
import Playlist from './src/components/Playlist'
import theme from './src/theme'

const AppRouter = () => (
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
)

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}

const styles = {
  navigationBar: {
    backgroundColor: theme.primaryColor
  },
  title: {
    color: theme.primaryTextColor
  }
}

export default App
