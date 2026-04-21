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
    removeLeague: (state, action) => {
      const leagueId = action.payload;
      state.leagues = state.leagues.filter(l => l.id !== leagueId);
      state.myLeagues = state.myLeagues.filter(l => l.id !== leagueId);
    },
  },
});

export const { setLeagueImages, setLeagues, setMyLeagues, removeLeague } =
  leaguesSlice.actions;

export default leaguesSlice.reducer;
