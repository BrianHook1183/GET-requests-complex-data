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
  $('.js-results, #js-error-message').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    if (!responseJson.data[i]){
      continue;
    }
    $('.js-results').append(`
      <h2>${responseJson.data[i].fullName}</h2>
      <p>${responseJson.data[i].description}</p>
      ${responseJson.data[i].images && responseJson.data[i].images[0] ?
         `<img class="photo" src="${responseJson.data[i].images[0].url}" alt="${responseJson?.data[i].images[0].altText}">` :
          ``}
      <p class="centered more">Learn more at <br>
      <a href="${responseJson.data[i].url}" target="bank">${responseJson.data[i].url}</a></p>`
    )};
    $('.js-results').append(`<p><a href="#js-form">Back to top</a></p>`);
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

// returns additional dropdowns to hidden 
function clearForm() {
  $(':reset').on("click", event => {
    $('#js-state2, #js-state3').addClass('hide');
  })
}
  
function watchForm() {
  handleMultipleStates();
  clearForm();
  $('#js-form').submit(event => {
    event.preventDefault();
    $('.js-results').empty();
    const maxResults = $('#js-max-results').val();
    let userState = [];
    // add states into final userState Variable
    userState.push($('#js-state1').val());
    if ($('#js-state2').val() != 'none') {
      userState.push($('#js-state2').val());
    }
    if ($('#js-state3').val() != 'none') {
      userState.push($('#js-state3').val());
    }
    console.log('userState is ' + userState + ' and maxResults is ' + maxResults);
    // TO DO: change loading text to a gif
    $('#js-error-message').text(`Loading...`);
    getNationalParks(userState, maxResults);
  });
}

// only displays necessary # of state dropdowns based on user interaction
function handleMultipleStates() {
  $('#js-state1, #js-state2, #js-state3').on("click", event => {
    // display second state dropdown only when initial state is selected
    if ($('#js-state1').children(":selected").val() != 'none') {
      $('#js-state2').removeClass('hide');
    }
    // display third state dropdown only when 2nd state is selected
    if ($('#js-state2').children(":selected").val() != 'none') {
      $('#js-state3').removeClass('hide');
    }
  })
}

$(watchForm);