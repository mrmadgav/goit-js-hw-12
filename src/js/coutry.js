'use strict';
import refs from './refs';
import countryCard from '../templates/countryCard.hbs';
import countryList from '../templates/countryList.hbs';
import { fetchCountries } from './fetchCountries';
import '@pnotify/core/dist/BrightTheme.css';
let { error } = require('@pnotify/core');
let debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(inputSearch, 500));
// let mainApi = 'https://restcountries.eu/rest/v2/name/';

// function fetchCountries(query) {
//   return fetch(mainApi + query).then(res => res.json());
// }

function inputSearch(e) {
  e.preventDefault();
  clearArticlesContainer();
  let searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.status === 404) {
        error({
          text:
            'No country has been found. Please enter a more specific query!',
        });
      } else if (data.length === 1) {
        buildListMarkup(data, countryCard);
      } else if (data.length <= 10) {
        buildListMarkup(data, countryList);
      }
    })
    .catch(Error => {
      Error({
        text: 'You must enter query parameters!',
      });
      console.log(Error);
    });
}

function buildListMarkup(countries, template) {
  let markup = countries.map(count => template(count)).join();
  refs.card.insertAdjacentHTML('afterbegin', markup);
}

function clearArticlesContainer() {
  refs.card.innerHTML = '';
}
