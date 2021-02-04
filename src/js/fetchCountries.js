let mainApi = 'https://restcountries.eu/rest/v2/name/';

export function fetchCountries(query) {
  return fetch(mainApi + query).then(res => res.json());
};