import React, { Fragment, useEffect } from 'react'
import './style.scss'

function initMap() {
    const google = window.google
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.999881, lng: 105.828481 },
        zoom: 15,
        streetViewControl: false,
        scaleControl: true,
        gestureHandling: "cooperative"
    });
    var input = document.getElementById('map-autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);
    autocomplete.setComponentRestrictions({ country: "VN" });

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        var view = document.getElementById("data");
        console.log(place)
        view.innerText = place.geometry.location.lat() + ', ' + place.geometry.location.lng()

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });
}

function loadGmap() {
    const allScripts = document.getElementsByTagName('script');
    const key = 'AIzaSyDwFzY_sFGPc9qOpj-2nQ13yeDeFDOuiv0'
    var isExisted = false
    for (var i = allScripts.length - 1; i >= 0; i--) {
        var scpt = allScripts[i];
        if (scpt.src.indexOf('key=' + key)) isExisted = true
    }

    if (isExisted && window.google) {
        initMap();
    } else {
        var script = document.createElement('script');
        script.onload = function () {
            initMap();
        };
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&libraries=places";
        document.head.appendChild(script);
    }
}

const Map = () => {
    useEffect(() => {
        loadGmap()
    }, [])
    return <Fragment>
        <div className="demo">
            <div className="autocomplete-wrapper">
                <div className="box-input">
                    <input id="map-autocomplete" type="text" placeholder="Enter a location" />
                </div>
                <div id="map"></div>
            </div>
            <div id="infowindow-content">
                <img src="" width="16" height="16" id="place-icon" />
                <span id="place-name" className="title"></span>
                <br />
                <span id="place-address"></span>
            </div>
        </div>
        <div id="data"></div>
    </Fragment>
}

export default Map