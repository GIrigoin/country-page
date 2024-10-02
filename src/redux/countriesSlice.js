import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
  name: "countries",

  initialState: {
    allCountries: [],
    displayedCountries: [],
    //Sort: name, population(default) or area
    sort: "Population",
    //Filters:
    filter: {
      //region
      Africa: false,
      Americas: false,
      Asia: false,
      Europe: false,
      Oceania: false,
      Antarctic: false,
      //misc
      member: false,
      independent: false,
    },
  },

  reducers: {
    setAllCountries(state, action) {
      state.allCountries = action.payload;
    },
  },
});

export const { setAllCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
