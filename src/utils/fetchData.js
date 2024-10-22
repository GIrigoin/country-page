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
export const getCountriesByName = async (searchText) => {
  const URL = "https://restcountries.com/v3.1/name/";

  try {
    const { data } = await axios(
      `${URL}${searchText}?fields=name,cca3,independent,unMember,region,area,population,flags`
    );

    if (data) return data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};

//* 3. Countries by region
export const getCountriesByRegion = async (region) => {
  const URL = "https://restcountries.com/v3.1/region/";

  try {
    const { data } = await axios(
      `${URL}${region}?fields=name,cca3,independent,unMember,region,area,population,flags`
    );

    if (data) return data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};

//* 4. Countries by sub-region
export const getCountriesBySubRegion = async (subRegion) => {
  const URL = "https://restcountries.com/v3.1/subregion/";

  try {
    const { data } = await axios(
      `${URL}${subRegion}?fields=name,cca3,independent,unMember,region,area,population,flags`
    );

    if (data) return data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};

//* 5. Country details by name
// Fields to fetch for Detail:
// name(common,official), population, area, capital, subregion, languages(obj=> array or string of values), currencies(obj), continents(array), borders(array of cca3)
