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
    <div className="flex justify-center">
      {country.area ? (
        <div className="w-full lg:w-[720px]  bg-background">
          <img
            className="w-64"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
          <section>
            <h1>{country.name.common}</h1>
            <p>{country.name.official}</p>
          </section>
          <section>
            <p>
              Population <span>{country.population}</span>
            </p>
            <p>
              Area (km²) <span>{country.area}</span>
            </p>
          </section>
          <section>
            <p className="flex justify-between">
              Capital<span>{country.capital}</span>
            </p>
            <p>
              Subregion<span>{country.subregion}</span>
            </p>
            <p>
              Language<span>{country.languages}</span>
            </p>
            <p>
              Currencies<span>{country.currencies}</span>
            </p>
            <p>
              Continents<span>{country.continents}</span>
            </p>
          </section>
          <section className="flex justify-start">
            {country.borders.map((border) => (
              <div>
                <img
                  className="w-20 h-14"
                  src={border.flags.svg}
                  alt={border.flags.alt}
                />
                <p>{border.name.common}</p>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Detail;
