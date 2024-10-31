import { useState } from "react";
import { regions, subRegions } from "../utils/constants";
import {
  getCountriesByName,
  getCountriesByRegion,
  getCountriesBySubRegion,
} from "../utils/fetchData";
import { setDisplayedCountries, sortCountries } from "../redux/countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import searchIcon from "../assets/Search.svg";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.countries.sort);
  const allCountries = useSelector((state) => state.countries.allCountries);
  const countries = useSelector((state) => state.countries.displayedCountries);

  const handleRegionClick = async (region) => {
    try {
      const newList = await getCountriesByRegion(region);
      dispatch(setDisplayedCountries(newList));
      dispatch(sortCountries(sort));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubRegionClick = async (subRegion) => {
    try {
      const newList = await getCountriesBySubRegion(subRegion);
      dispatch(setDisplayedCountries(newList));
      dispatch(sortCountries(sort));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = async (value) => {
    try {
      if (value !== "") {
        const newList = await getCountriesByName(value);
        dispatch(setDisplayedCountries(newList));
        dispatch(sortCountries(sort));
      } else {
        dispatch(setDisplayedCountries(allCountries));
        dispatch(sortCountries(sort));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const debouncedHandleInputChange = useDebouncedCallback(
    handleInputChange,
    300
  );

  return (
    <div className="flex justify-between mb-11 items-center">
      {countries.length >= 0 ? (
        <p className="font-medium text-secondary-text text-title">{`Found ${countries.length} countries`}</p>
      ) : (
        <p>Searching...</p>
      )}
      <search className="static">
        <img className="absolute p-3" src={searchIcon} alt="" />
        <input
          className="peer/input pl-11 py-3 pr-3 bg-input-bg rounded-lg w-80 text-main-text text-body"
          placeholder="Search by Name, Region, Subregion"
          type="search"
          name=""
          id=""
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedHandleInputChange(e.target.value);
          }}
        />
        <section className="absolute invisible p-2 bg-input-bg text-main-text text-body peer-focus/input:visible">
          <p className="text-secondary-text text-title py-1 border-b border-t-secondary-text mb-2">
            Regions
          </p>
          {regions.map((region) => (
            <p
              onMouseDown={async () => await handleRegionClick(region)}
              className="hover:cursor-pointer hover:bg-secondary-text hover:text-background "
              key={region}
            >
              {region}
            </p>
          ))}

          <p className="text-secondary-text text-title py-1 border-b border-t-secondary-text mb-2">
            Subregions
          </p>
          {subRegions.map((subRegion) => (
            <p
              onMouseDown={async () => await handleSubRegionClick(subRegion)}
              className="hover:cursor-pointer hover:bg-secondary-text hover:text-background "
              key={subRegion}
            >
              {subRegion}
            </p>
          ))}
        </section>
      </search>
    </div>
  );
};

export default SearchBar;
