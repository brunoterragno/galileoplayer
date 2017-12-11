import { combineReducers } from "redux";
import PlayerReducer from "./PlayerReducer";
import PlaylistsReducer from "./PlaylistsReducer";

export default combineReducers({
  player: PlayerReducer,
  playlists: PlaylistsReducer
});
