import { useSelector } from "react-redux";
import CountryRow from "./CountryRow";

const CountryCards = () => {
  const countries = useSelector((state) => state.countries.displayedCountries);
  return (
    <div className="flex-3">
      <section>
        <table className="w-full">
          <colgroup>
            <col span={4} />
            <col span={1} className="collapse lg:visible" />
          </colgroup>
          <thead>
            <tr className="text-small text-secondary-text border-b border-input-bg text-left">
              <th className="py-5">Flag</th>
              <th>Name</th>
              <th>Population</th>
              <th>{"Area (km²)"}</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {countries.length >= 0 ? (
              countries.map((country, index) => (
                <CountryRow
                  key={index}
                  flags={country.flags}
                  name={country.name}
                  population={country.population}
                  area={country.area}
                  region={country.region}
                />
              ))
            ) : (
              <tr>
                <th scope="row" colSpan={5}>
                  Loading...
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CountryCards;
