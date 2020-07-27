'use strict';

// put your own value below!
const apiKey = 'S3PIwtlifWpQrUW77bMmd11WZ3NTjfa4hB7FsWwp'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks';



function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-state').val();
    const maxResults = $('#js-max-results').val();
    console.log(searchTerm + ' ' + maxResults);
  });
}

$(watchForm);