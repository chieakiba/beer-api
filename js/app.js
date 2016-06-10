//global variable
var userCitySearch;
var userStateSearch;
var beerSearch;

//API function for brewery request
function getBreweryRequest(city, state) {
    userCitySearch = $('.cityInput').val();
    userStateSearch = $('.stateInput').val();
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

// function showBreweryResults(items) {
//     var breweryName = name; 
//     $.each(items, function(index, item){
//         console.log(item);
//         breweryName += name;
//     })
//     $('.nameBrewery').append(breweryName);

// }

//API function for beer request
function getBeerRequest(name) {
    beerSearch = $('.beer').val();
    var params = {
        key: '4eee5db4403b144dbc068306c3d4680f',
        name: beerSearch
    }
    url = 'http://api.brewerydb.com/v2/beers';
    $.getJSON(url, params, function(data) {
        console.log(data);
        showBeerResults(data.item);
    })
}

function showBeerResults(array) {
    var beerInfo = '';
    $.each(array, function(index, item){
        console.log(item);
        beerInfo +=  '<li class="nameBeer">Name: ' + item.name + '</li>' + '<li class="abvBeer">ABV: ' + item.abv + '</li>' + '<li class="foodPairingBeer">Best food to pair with: ' + item.foodPairings + '</li>' + '<li class="descriptionBeer">Description: ' + item.description + '</li>'
    });
    $('.beerResults').append(beerInfo);
}

//Google Maps API
function mapRequest() {
    var params = {
        key: 'AIzaSyC67XoBhkayUP2I11lJdcFB4TD3gFBBvs0',

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
    $('.searchBrewery').click(function(event) {
        event.preventDefault();
        getBreweryRequest(userCitySearch, userStateSearch);
    });
    $('.searchBeer').click(function(event) {
        event.preventDefault();
        getBeerRequest(beerSearch);
    })
})