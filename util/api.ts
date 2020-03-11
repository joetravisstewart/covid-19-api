import {
  extractSingleValue,
  fetchFeatures,
  attributeSpreader,
  normalizeKeys
} from "./data";

import { endpoints } from "./endpoints";
import {
  queryTotalDeaths,
  queryTotalConfirmed,
  queryTotalRecovered,
  queryLastUpdate
} from "./query";
import { getCountryName } from "./countries";

export const getTotalConfirmed = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalConfirmed(getCountryName(countryName))
    )
  );
};

export const getTotalRecovered = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalRecovered(getCountryName(countryName))
    )
  );
};

export const getTotalDeaths = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalDeaths(getCountryName(countryName))
    )
  );
};

export const getLastUpdate = async (countryName?: string) => {
  const feature = (
    await fetchFeatures(
      endpoints.cases,
      queryLastUpdate(getCountryName(countryName))
    )
  )
    .map(attributeSpreader)
    .map(normalizeKeys)[0];
  return new Date(feature.lastUpdate).toISOString();
};
