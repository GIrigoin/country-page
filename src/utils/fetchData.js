import axios from "axios";

//! I need:

//* 1. All countries
//1.1 Fields to fetch:
// name(name.common),cca3, independent, unMember, region, area, population, flag, flags(png, svg, alt)

export const getAllCountries = async () => {
  const URL = "https://restcountries.com/v3.1/all";
  try {
    const { data } = await axios(
      `${URL}?fields=name,cca3,independent,unMember,region,area,population,flags`
    );

    if (data) return data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};

//* 2. Countries by name

//* 3. Countries by region

//* 4. Countries by sub-region

//* 5. Country details by name
// Fields to fetch for Detail:
// name(common,official), population, area, capital, subregion, languages(obj=> array or string of values), currencies(obj), continents(array), borders(array of cca3)
