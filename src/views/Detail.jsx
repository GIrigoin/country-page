import { useEffect, useState } from "react";
import { getBorderInfo, getCountryDetails } from "../utils/fetchData";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Detail = () => {
  const [country, setCountry] = useState({});
  const countryName = useParams();
  const allCountries = useSelector((state) => state.countries.allCountries);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCountryDetails(countryName.country);

        // console.log(data);

        const { name, subregion, area, population, flags } = data[0];

        const borders = [];

        for await (const border of data[0].borders) {
          const borderData = await getBorderInfo(border);

          console.log(borderData);
          borders.push(borderData);
        }

        const languages = Object.values(data[0].languages).join(", ");

        const continents = data[0].continents.join(", ");

        const currencies = Object.values(data[0].currencies)
          .map((value) => value.name)
          .join(", ");

        const capital = data[0].capital.join(", ");

        // const borders = data[0].borders.map((border) => {
        //   console.log(border);

        //   const borderData = allCountries?.find(
        //     (country) => border.toUpperCase() === country.cca3.toUpperCase()
        //   );

        //   console.log(borderData);

        //   return { name: borderData.name.common, flag: borderData.flags.svg };
        // });

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
        console.log(countryDetail);
        setCountry(countryDetail);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return <div>Detail</div>;
};

export default Detail;
