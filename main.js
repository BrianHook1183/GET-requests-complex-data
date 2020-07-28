'use strict';

// global variables
const apiKey = 'S3PIwtlifWpQrUW77bMmd11WZ3NTjfa4hB7FsWwp'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-results').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('.js-results').append(`
      <h2>${responseJson.data[i].fullName}</h2>
      <p>${responseJson.data[i].description}</p>
      <p>Learn more at <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p><hr>`
    )};
  $('.js-results').removeClass('hide');
};
  
function getNationalParks(userState, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: userState,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = baseURL + '?' + queryString;
  console.log(url);
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const userState = $('#js-state').val();
    const maxResults = $('#js-max-results').val();
    console.log(userState + ' ' + maxResults);
    getNationalParks(userState, maxResults);
  });
}

$(watchForm);