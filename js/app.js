//global variable
var userCitySearch;
var userStateSearch;
var beerSearch;
var map;

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
        $('.pages').pagination({
            dataSource: data,
            locator: 'data',
            pageSize: 5,
            callback: function(data, pagination) {
                console.log(data);
                var beerData = showBeerResults(data);
                console.log(beerData, 'hello');
                $('.beerResults').html(beerData);
            }
        });
    })
}

function showBeerResults(data) {
    var beerInfo = '';
    $.each(data, function(index, item) {
        console.log(item);
        beerInfo += '<hr><li class="nameBeer">Name: ' + item.name + '</li>' + '<li class="abvBeer">ABV: ' + item.abv + '</li>' + '<li class="foodPairingBeer">Best food to pair with: ' + item.foodPairings + '</li>' + '<li class="descriptionBeer">Description: ' + item.description + '</li></hr>'
    });
    return beerInfo;
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
        $('.pages').pagination({
            dataSource: data,
            locator: 'data',
            pageSize: 5,
            callback: function(data, pagination) {
                console.log(data);
                var breweryData = showBreweryResults(data);
                console.log(breweryData, 'hello');
                $('.breweryResults').html(breweryData);
            }
        });
    })
}

function showBreweryResults(data) {
    var breweryInfo = '';
    var breweryLatitude = '';
    var breweryLongitude = '';
    var breweryName = '';
    $.each(data, function(index, item) {
        var myLatLng = {
            lat: item.latitude,
            lng: item.longitude
        }
        breweryMap(myLatLng, item.brewery.name);
        console.log(myLatLng, 'hello');
        breweryInfo += "<hr><li class='nameBrewery'>Name: " + item.brewery.name + "</li>" + "<li class='street-addressBrewery'>Street Address: " + item.streetAddress + "</li>" + "<li class='cityBrewery'>City: " + item.locality + "</li>" + "<li class='stateBrewery'>State: " + item.region + "</li>" + "<li class='zipcodeBrewery'>Zip Code: " + item.postalCode + "</li>" + "<li class='phoneBrewery'>Phone number: " + item.phone + "</li>" + "<li class='websiteBrewery'>Website: " + item.website + "</li>" + "<li class='hoursBrewery'>Hours of Operation: " + item.hoursOfOperation + "</li></hr>"
    })
    return breweryInfo;
}

// Google Maps API
function breweryMap(myLatLng, breweryName) {
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