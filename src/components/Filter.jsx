import { useSelector, useDispatch } from "react-redux";
import { sortCountries, changeFilter } from "../redux/countriesSlice";
import { regions } from "../utils/constants";
import arrowIcon from "../assets/Expand_down.svg";
import checkIcon from "../assets/Done_round.svg";

const Filter = () => {
  const sort = useSelector((state) => state.countries.sort);
  const dispatch = useDispatch();

  const regionFilter = useSelector((state) => state.countries.regionFilter);
  const miscFilter = useSelector((state) => state.countries.miscFilter);

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
      <section className="mb-7 text-body text-main-text">
        <p className="text-small text-secondary-text font-medium mb-3">
          Region
        </p>
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => (
            <label key={region} htmlFor={region.toLowerCase()}>
              <input
                className={`appearance-none`}
                type="checkbox"
                name="regions"
                id={region.toLowerCase()}
                value={region}
                onChange={handleRegionChange}
              />
              <span
                className={`p-3 ${
                  regionFilter[region] ? "bg-input-bg rounded-2xl" : ""
                }`}
              >
                {region}
              </span>
            </label>
          ))}
        </div>
      </section>
      <section className="mb-7 ">
        <p className="text-small text-secondary-text font-medium mb-3">
          Status
        </p>
        <label htmlFor="unMember" className="flex items-center gap-2 mb-3">
          <input
            className="appearance-none"
            type="checkbox"
            name="status"
            id="unMember"
            value="unMember"
            onChange={handleStatusChange}
          />
          <div>
            {miscFilter["unMember"] ? (
              <img className="bg-checked-item rounded" src={checkIcon} alt="" />
            ) : (
              <div className="w-6 h-6 border-2 border-secondary-text rounded border-solid"></div>
            )}
          </div>
          <span className="text-main-text text-body">
            Member of the United Nations
          </span>
        </label>
        <label htmlFor="independent" className="flex items-center gap-2">
          <input
            className="appearance-none"
            type="checkbox"
            name="status"
            id="independent"
            value="independent"
            onChange={handleStatusChange}
          />
          <div>
            {miscFilter["independent"] ? (
              <img className="bg-checked-item rounded" src={checkIcon} alt="" />
            ) : (
              <div className="w-6 h-6 border-2 border-secondary-text rounded border-solid"></div>
            )}
          </div>
          <span className="text-main-text text-body">Independent</span>
        </label>
      </section>
    </search>
  );
};

export default Filter;
