import { createSlice } from "@reduxjs/toolkit";
import { regions } from "../utils/constants";

const countriesSlice = createSlice({
  name: "countries",

  initialState: {
    allCountries: [],
    displayedCountries: [],
    //Sort: name, population(default) or area
    sort: "population",
    //Filters:

    regionFilter: {
      Africa: false,
      Americas: false,
      Asia: false,
      Europe: false,
      Oceania: false,
      Antarctic: false,
    },
    miscFilter: {
      unMember: false,
      independent: false,
    },
  },

  reducers: {
    setAllCountries(state, action) {
      state.allCountries = action.payload;
    },

    setDisplayedCountries(state, action) {
      state.displayedCountries = action.payload;
    },

    sortCountries(state, action) {
      const { payload } = action;
      state.sort = payload;
      if (payload === "population") {
        state.displayedCountries.sort((a, b) => b.population - a.population);
      }

      if (payload === "name") {
        state.displayedCountries.sort((a, b) => {
          const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }

      if (payload === "area") {
        state.displayedCountries.sort((a, b) => b.area - a.area);
      }
    },

    changeFilter(state, action) {
      //action: { filterby: "region/misc", changes:{changedState:boolean} }

      const { filterBy, changes } = action.payload;

      if (filterBy === "region")
        state.regionFilter = { ...state.regionFilter, ...changes };
      if (filterBy === "misc")
        state.miscFilter = { ...state.miscFilter, ...changes };

      //The region filtering is additive, the other ones are substractive.

      //region: if no filter is selected show all, else show only selected ones
      if (Object.values(state.regionFilter).every((item) => item === false)) {
        state.displayedCountries = state.allCountries;
      } else {
        state.displayedCountries = [];
        for (const property in state.regionFilter) {
          if (state.regionFilter[property]) {
            const addedCountries = state.allCountries.filter(
              (country) => country.region === property
            );
            state.displayedCountries = [
              ...state.displayedCountries,
              ...addedCountries,
            ];
          }
        }
      }

      //misc filtering

      for (const property in state.miscFilter) {
        if (state.miscFilter[property])
          state.displayedCountries = state.displayedCountries.filter(
            (element) => element[property]
          );
      }
    },

    resetFilter(state, action) {
      for (const property in state.filter) {
        state.filter[property] = false;
      }
      state.displayedCountries = state.allCountries;
    },
  },
});

export const {
  setAllCountries,
  setDisplayedCountries,
  sortCountries,
  changeFilter,
} = countriesSlice.actions;
export default countriesSlice.reducer;
