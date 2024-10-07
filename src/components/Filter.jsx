import { useSelector, useDispatch } from "react-redux";
import { sortCountries, changeFilter } from "../redux/countriesSlice";
import { regions } from "../utils/constants";

const Filter = () => {
  const countries = useSelector((state) => state.countries.displayedCountries);
  const sort = useSelector((state) => state.countries.sort);
  const regionFilter = useSelector((state) => state.countries.regionFilter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(sortCountries(event.target.value));
  };

  const handleRegionChange = (event) => {
    dispatch(
      changeFilter({
        filterBy: "region",
        changes: { [event.target.value]: event.target.checked },
      })
    );

    dispatch(sortCountries(sort));
  };
  return (
    <div>
      {countries.length >= 0 ? (
        <p>{`Found ${countries.length} countries`}</p>
      ) : (
        <p>Searching...</p>
      )}
      <section>
        <p>Sort by</p>
        <select name="order" id="" value={sort} onChange={handleChange}>
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Area</option>
        </select>
      </section>
      <section>
        <p>Region</p>

        {regions.map((region) => (
          <label htmlFor={region}>
            <input
              type="checkbox"
              name="regions"
              id={region}
              value={region}
              onChange={handleRegionChange}
            />
            <span>{region}</span>
          </label>
        ))}
      </section>
    </div>
  );
};

export default Filter;
