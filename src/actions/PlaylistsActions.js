import {
  PLAYLISTS_FETCH,
  PLAYLISTS_FETCH_SUCCESS,
  PLAYLISTS_FETCH_FAIL,
  SELECT_PLAYLIST
} from "../actions/types";
import { popularPlaylists, myPlaylist, songs } from "../data";

export const fetchPlaylists = () => {
  dispatch({ type: PLAYLISTS_FETCH });
  setTimeout(() => {
    dispatch({
      type: PLAYLISTS_FETCH_SUCCESS,
      payload: { popularPlaylists, myPlaylist }
    });
  }, 2000);
};

export const selectPlaylist = ({ id }) => {
  const { title } = popularPlaylists.find(item => item.id === id);
  dispatch({
    type: SELECT_PLAYLIST,
    payload: {
      title,
      songs
    }
  });
};
