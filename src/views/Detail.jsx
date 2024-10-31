import { useEffect, useState } from "react";
import { getBorderInfo, getCountryDetails } from "../utils/fetchData";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [country, setCountry] = useState({});
  const countryName = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await getCountryDetails(countryName.country);

        const { name, subregion, area, population, flags } = data[0];

        const borders = await getBorderInfo(data[0].borders);

        const languages = Object.values(data[0].languages).join(", ");

        const continents = data[0].continents.join(", ");

        const currencies = Object.values(data[0].currencies)
          .map((value) => value.name)
          .join(", ");

        const capital = data[0].capital.join(", ");

        const countryDetail = {
          name,
          subregion,
          area,
          population,
          flags,
          languages,
          continents,
          currencies,
          capital,
          borders,
        };
        setCountry(countryDetail);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center w-screen">
      {country.area ? (
        <div className="w-full lg:w-[720px]  bg-background border border-input-bg rounded-xl flex flex-col items-center static pt-44">
          <div className="w-64 h-48 absolute top-52 ">
            <img
              className="rounded-xl"
              src={country.flags.svg}
              alt={country.flags.alt}
            />
          </div>
          <section>
            <h1 className="text-large text-main-text font-medium text-center">
              {country.name.common}
            </h1>
            <p className="text-center text-title text-main-text font-medium">
              {country.name.official}
            </p>
          </section>
          <section className="flex flex-row justify-center gap-10 my-10">
            <p className="rounded-xl py-2 px-5 text-body font-medium bg-input-bg text-main-text flex flex-row">
              <span className="py-2 pr-5 mr-5 border-r border-background">
                Population{" "}
              </span>
              <span className="py-2">{country.population}</span>
            </p>
            <p className="rounded-xl py-2 px-5 text-body font-medium bg-input-bg text-main-text flex flex-row">
              <span className="py-2 pr-5 mr-5 border-r border-background">
                Area (km²){" "}
              </span>
              <span className="py-2">{country.area}</span>
            </p>
          </section>
          <section className="w-full border-t border-input-bg">
            <p className="flex justify-between border-b border-input-bg py-6 px-5">
              <span className="text-secondary-text font-medium text-body">
                Capital
              </span>
              <span className="text-main-text font-medium text-body">
                {country.capital}
              </span>
            </p>
            <p className="flex justify-between border-b border-input-bg py-6 px-5">
              <span className="text-secondary-text font-medium text-body">
                Subregion
              </span>
              <span className="text-main-text font-medium text-body">
                {country.subregion}
              </span>
            </p>
            <p className="flex justify-between border-b border-input-bg py-6 px-5">
              <span className="text-secondary-text font-medium text-body">
                Language
              </span>
              <span className="text-main-text font-medium text-body">
                {country.languages}
              </span>
            </p>
            <p className="flex justify-between border-b border-input-bg py-6 px-5">
              <span className="text-secondary-text font-medium text-body">
                Currencies
              </span>
              <span className="text-main-text font-medium text-body">
                {country.currencies}
              </span>
            </p>
            <p className="flex justify-between border-b border-input-bg py-6 px-5">
              <span className="text-secondary-text font-medium text-body">
                Continents
              </span>
              <span className="text-main-text font-medium text-body">
                {country.continents}
              </span>
            </p>
          </section>
          <section className="pb-20 w-full px-5">
            <p className="py-6 text-secondary-text font-medium text-body">
              Neighbouring Countries
            </p>
            <div className="flex justify-start gap-4">
              {country.borders.map((border) => (
                <div>
                  <img
                    className="w-20 h-14 rounded-md"
                    src={border.flags.svg}
                    alt={border.flags.alt}
                  />
                  <p className="text-main-text font-medium text-small py-2">
                    {border.name.common}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Detail;
