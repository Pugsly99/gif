import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

function clearFields() {
  $('#giphy').val("");
  $('#trending').val("");
  $('.show-errors').text("");
  $('.show-gif').text("");
}

function displaySearch(url) {
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayTrending(response) {
  const url = response.data[0].images.downsized.url
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#giphy-search').click(function() {
    let topic = $('#giphy').val();
    clearFields();
    GiphyService.getGif(topic)
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        const gihpyImage = giphyResponse.data[0].images.original.url;
        displaySearch(gihpyImage);
        return GiphyService.getGif(weatherDescription);
      })
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      })
      .catch(function(error) {
        displayErrors(error.message)
      })
  });
  $('#trending').click(function() {
    let imageLimit = parseInt($('#limit').val());
    clearFields();
    GiphyService.getTrending(imageLimit)
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        for (let i = 0; i < imageLimit - 1 ; i++) {

        }
        const gihpyImage = giphyResponse.data[0].images[i].original.url;
        displayTrending(gihpyImage);
        return GiphyService.getGif(weatherDescription);
      })
});