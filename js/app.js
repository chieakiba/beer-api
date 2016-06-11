//global variable
var userCitySearch;
var userStateSearch;
var beerSearch;
var map;

//Pagination
$(function() {
    $('.pages').pagination({
        items: 100,
        itemsOnPage: 2,
        cssStyle: 'light-theme'
    });
});

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
        beerInfo += '<hr><li class="nameBeer">Name: ' + item.name + '</li>' + '<li class="abvBeer">ABV: ' + item.abv + '</li>' + '<li class="foodPairingBeer">Best food to pair with: ' + item.foodPairings + '</li>' + '<li class="descriptionBeer">Description: ' + item.description + '</li></hr>'
    });
    $('.beerResults').append(beerInfo);
}

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
    var breweryLatitude = '';
    var breweryLongitude = '';
    var breweryName = '';
    $.each(data, function(index, item) {
        console.log(item);
        breweryInfo += "<hr><li class='nameBrewery'>Name: " + item.brewery.name + "</li>" + "<li class='street-addressBrewery'>Street Address: " + item.streetAddress + "</li>" + "<li class='cityBrewery'>City: " + item.locality + "</li>" + "<li class='stateBrewery'>State: " + item.region + "</li>" + "<li class='zipcodeBrewery'>Zip Code: " + item.postalCode + "</li>" + "<li class='phoneBrewery'>Phone number: " + item.phone + "</li>" + "<li class='websiteBrewery'>Website: " + item.website + "</li>" + "<li class='hoursBrewery'>Hours of Operation: " + item.hoursOfOperation + "</li></hr>"
        breweryLatitude += item.latitude;
        breweryLongitude += item.longitude;
        breweryName += item.brewery.name;
    })
    $('.breweryResults').append(breweryInfo);
    //Google Maps API
    function breweryMap() {
        var myLatLng = {
            lat: breweryLatitude,
            lng: breweryLongitude
        };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });
        var beerIcon = 'image/beermarker.png'
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: breweryName,
            icon: beerIcon
        });
    }
    breweryMap();
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