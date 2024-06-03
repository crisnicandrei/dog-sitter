"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader, Marker } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { set } from "date-fns";

const libs = ["core", "maps", "places", "marker"];

const buildMapInfoCard = (title, body) =>
  `<div>
        <h1>${title}</h1>
        <p>${body}</p>
   </div>`;

export default function Map(latlong) {
  const mapRef = useRef(null);
  const placeAuthCompleteRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC2Q3EuM1N37s_5AZSDhKlZc_Z-PZoyfxM",
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: { lat: 45.75149353718256, lng: 21.37802036583673 },
        zoom: 17,
      };

      const gMap = new google.maps.Map(mapRef.current, mapOptions);

      const romania = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.5, 20.2),
        new google.maps.LatLng(48.5, 29.7)
      );

      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAuthCompleteRef.current,
        {
          bounds: romania,
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["ro"],
          },
        }
      );

      setMap(gMap);
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        console.log("THE PLACE IS:", place);
        setSelectedPlace(place.formatted_address);

        const position = place.geometry?.location;
        if (position) {
          setMarker(position, place.name);
        }
      });
    }
  }, [autoComplete]);

  const setMarker = (location, name) => {
    if (!map) {
      return;
    }
    map.setCenter(location);

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Marker",
    });

    const infoCard = new google.maps.InfoWindow({
      position: location,
      content: buildMapInfoCard(name, name),
      maxWidth: 200,
    });

    infoCard.open({ map, anchor: marker });
  };
  return (
    <div>
      <div className="form-inner">
        <input ref={placeAuthCompleteRef} type="text" />
      </div>
      {isLoaded ? (
        <div style={{ height: "600px" }} ref={mapRef} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
