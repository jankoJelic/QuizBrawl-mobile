import { createSlice } from '@reduxjs/toolkit';
import { League } from 'services/api/endpoints/leaguesAPI';
import { ShallowUser } from 'store/types/authSliceTypes';

export interface LeaguesState {
  leagues: League[];
  leagueImages: string[];
  myLeagues: League[];
}

const initialState: LeaguesState = {
  leagues: [],
  leagueImages: [],
  myLeagues: [],
};

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    setLeagues: (state, action) => {
      state.leagues = action.payload;
    },
    setMyLeagues: (state, action) => {
      state.myLeagues = action.payload;
    },
    setLeagueImages: (state, action) => {
      state.leagueImages = action.payload;
    },
    addPlayerToLeague: (
      state,
      action: { payload: { leagueId: number; user: ShallowUser } },
    ) => {},
    addUserToLeague: (state, action) => {},
    removeUserFromLeague: (state, action) => {},
    updateLeague: (state, action) => {},
  },
});

export const {
  setLeagueImages,
  setLeagues,
  setMyLeagues,
  addPlayerToLeague,
  addUserToLeague,
  removeUserFromLeague,
  updateLeague,
} = leaguesSlice.actions;

export default leaguesSlice.reducer;
