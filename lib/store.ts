import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload: any) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload: any) => {
    state.activeSong = payload;
  }),
});
