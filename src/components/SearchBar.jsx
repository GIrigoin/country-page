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

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.countries.sort);
  const allCountries = useSelector((state) => state.countries.allCountries);

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
    <search className="static">
      <input
        className="peer/input"
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
      <section className="absolute invisible bg-secondary-text peer-focus/input:visible">
        <p>Regions</p>
        {regions.map((region) => (
          <p
            onMouseDown={async () => await handleRegionClick(region)}
            className="hover:cursor-pointer hover:bg-input-bg"
            key={region}
          >
            {region}
          </p>
        ))}

        <p>Subregions</p>
        {subRegions.map((subRegion) => (
          <p
            onMouseDown={async () => await handleSubRegionClick(subRegion)}
            className="hover:cursor-pointer hover:bg-input-bg"
            key={subRegion}
          >
            {subRegion}
          </p>
        ))}
      </section>
    </search>
  );
};

export default SearchBar;
