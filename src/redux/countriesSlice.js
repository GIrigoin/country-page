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
    filter: {
      //region
      Africa: false,
      Americas: false,
      Asia: false,
      Europe: false,
      Oceania: false,
      Antarctic: false,
      //misc
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
      const { payload } = action;
      state.filter = { ...state.filter, ...payload };
      state.displayedCountries = state.allCountries;
      for (const property in state.filter) {
        if (state.filter[property])
          state.displayedCountries = state.displayedCountries.filter(
            (element) => {
              if (regions.includes(property)) {
                return element.region === property;
              }
              return element[property];
            }
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
