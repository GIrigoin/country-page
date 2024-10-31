import { useSelector, useDispatch } from "react-redux";
import { sortCountries, changeFilter } from "../redux/countriesSlice";
import { regions } from "../utils/constants";
import arrowIcon from "../assets/Expand_down.svg";

const Filter = () => {
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
    <search className="flex-1 pr-8">
      {/* {countries.length >= 0 ? (
        <p>{`Found ${countries.length} countries`}</p>
      ) : (
        <p>Searching...</p>
      )} */}
      <section className="mb-7">
        <p className="text-small text-secondary-text font-medium mb-3">
          Sort by
        </p>
        <div className="relative">
          <img className="absolute right-0 p-2 pt-3" src={arrowIcon} alt="" />
          <select
            className="w-full appearance-none bg-background rounded-md text-main-text p-2 text-body border border-input-bg "
            name="order"
            id=""
            value={sort}
            onChange={handleSortChange}
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
            <option value="area">Area</option>
          </select>
        </div>
      </section>
      <section className="mb-7">
        <p className="text-small text-secondary-text font-medium mb-3">
          Region
        </p>

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
      <section className="mb-7">
        <p className="text-small text-secondary-text font-medium mb-3">
          Status
        </p>
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
