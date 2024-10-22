import { useSelector, useDispatch } from "react-redux";
import { sortCountries, changeFilter } from "../redux/countriesSlice";
import { regions } from "../utils/constants";

const Filter = () => {
  const countries = useSelector((state) => state.countries.displayedCountries);
  const sort = useSelector((state) => state.countries.sort);
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
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

  const handleStatusChange = (event) => {
    dispatch(
      changeFilter({
        filterBy: "misc",
        changes: { [event.target.value]: event.target.checked },
      })
    );

    dispatch(sortCountries(sort));
  };

  return (
    <search>
      {countries.length >= 0 ? (
        <p>{`Found ${countries.length} countries`}</p>
      ) : (
        <p>Searching...</p>
      )}
      <section>
        <p>Sort by</p>
        <select name="order" id="" value={sort} onChange={handleSortChange}>
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Area</option>
        </select>
      </section>
      <section>
        <p>Region</p>

        {regions.map((region) => (
          <label key={region} htmlFor={region}>
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
      <section>
        <p>Status</p>
        <label htmlFor="unMember">
          <input
            type="checkbox"
            name="status"
            id="unMember"
            value="unMember"
            onChange={handleStatusChange}
          />
          <span>Member of the United Nations</span>
        </label>
        <label htmlFor="independent">
          <input
            type="checkbox"
            name="status"
            id="independent"
            value="independent"
            onChange={handleStatusChange}
          />
          <span>Independent</span>
        </label>
      </section>
    </search>
  );
};

export default Filter;
