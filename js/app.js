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
        showBreweryResults(data.data);
    })
}

function showBreweryResults(data) {
    var breweryInfo = '';
    $.each(data, function(index, item) {
        console.log(item);
        breweryInfo += "<li class='nameBrewery'>Name: " + item.brewery.name + "</li>" + "<li class='street-addressBrewery'>Street Address: " + item.streetAddress + "</li>" + "<li class='cityBrewery'>City: " + item.locality + "</li>" + "<li class='stateBrewery'>State: " + item.region + "</li>" + "<li class='zipcodeBrewery'>Zip Code: " + item.postalCode + "</li>" + "<li class='phoneBrewery'>Phone number: " + item.phone + "</li>" + "<li class='websiteBrewery'>Website: " + item.website + "</li>" + "<li class='hoursBrewery'>Hours of Operation: " + item.hoursOfOperation + "</li>" + "<li class='tourBrewery'>Tour info: " + item.tourInfo + "</li>"
    })
    $('.breweryResults').append(breweryInfo);

}

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
        showBeerResults(data.data);
    })
}

function showBeerResults(data) {
    var beerInfo = '';
    $.each(data, function(index, item) {
        console.log(item);
        beerInfo += '<li class="nameBeer">Name: ' + item.name + '</li>' + '<li class="abvBeer">ABV: ' + item.abv + '</li>' + '<li class="foodPairingBeer">Best food to pair with: ' + item.foodPairings + '</li>' + '<li class="descriptionBeer">Description: ' + item.description + '</li>'
    });
    $('.beerResults').append(beerInfo);
}

//Google Maps API
function mapRequest() {
    var params = {
        key: 'AIzaSyC67XoBhkayUP2I11lJdcFB4TD3gFBBvs0',

    }
    url = 'http://maps.googleapis.com/';
    $.getJSON(url, params, function(data) {
        console.log(data);
        showMapResults(data.items);
    })
}

function showMapResults(items) {

}

$(document).ready(function() {
    $('.breweryResults').hide();
    $('.beerResults').hide();
    $('.searchBrewery').click(function(event) {
        event.preventDefault();
        getBreweryRequest(userCitySearch, userStateSearch);
        $('.breweryResults').show();
    });
    $('.searchBeer').click(function(event) {
        event.preventDefault();
        getBeerRequest(beerSearch);
        $('.beerResults').show();
    })
})