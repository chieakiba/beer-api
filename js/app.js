//global variable
var userCitySearch = $('.cityInput').val();
var userStateSearch = $('.stateInput').val();
var beerSearch = $('.beer').val();

//API function for brewery request
function getBreweryRequest(city, state) {
    var params = {
        key: '4eee5db4403b144dbc068306c3d4680f',
        locality: userCitySearch,
        region: userStateSearch
    }
    url = 'http://api.brewerydb.com/v2/locations';
    $.getJSON(url, params, function(data) {
        console.log(data);
        showBreweryResults(data.items);
    })
}

function showBreweryResults(items) {
    var html = "";

}

//API function for beer request
function getBeerRequest(name) {
    var params = {
        key: '4eee5db4403b144dbc068306c3d4680f',
        name: beerSearch
    }
    url = 'http://api.brewerydb.com/v2/beers';
    $.getJSON(url, params, function(data) {
        console.log(data);
        showBeerResults(data.items);
    })
}

function showBeerResults(items) {

}

//Google Maps API
function mapRequest() {
    var params = {
        key: '',

    }
    url = '';
    $.getJSON(url, params, function(data) {
        console.log(data);
        showMapResults(data.items);
    })
}

function showMapResults(items) {

}

$(document).ready(function() {
    $(function() {
        $('.searchBrewery').click(function(event) {
            event.preventDefault();
            getBreweryRequest(userCitySearch, userStateSearch);
        });
    })
    $(function() {
        $('.searchBeer').click(function(event) {
            event.preventDefault();
            getBeerRequest(beerSearch);
        })
    })
})