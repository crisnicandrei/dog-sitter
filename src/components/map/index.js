"use client";
// ** React Imports
import React, { useContext, useEffect, useRef, useState } from "react";

// ** Third party libraries imports
import { useJsApiLoader } from "@react-google-maps/api";

// ** Context import
import { AuthContext } from "../../context/AuthContext";

// ** Utils iImports

import { removeDiacriticsAndLowercase } from "../../utils";

const libs = ["core", "maps", "places", "marker"];

const buildMapInfoCard = (title, body) =>
  `<div>
        <h1>${title}</h1>
        <p>${body}</p>
   </div>`;

export default function Map({ latlong, profileEdit = false }) {
  const mapRef = useRef(null);
  const placeAuthCompleteRef = useRef(null);

  const { user, updateUser } = useContext(AuthContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC2Q3EuM1N37s_5AZSDhKlZc_Z-PZoyfxM",
    libraries: libs,
    language: "ro",
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        center: latlong || { lat: 44.4268, lng: 26.1025 },
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
          fields: [
            "formatted_address",
            "address_components",
            "geometry",
            "name",
          ],
          componentRestrictions: {
            country: ["ro"],
          },
        }
      );

      gAutoComplete.addListener("place_changed", () => {
        const place = gAutoComplete.getPlace();
        if (place.address_components && place.geometry) {
          const town = place.address_components.find((component) =>
            component.types.includes("locality")
          );
          const position = place.geometry.location;
          if (town && position) {
            const lat = position.lat();
            const lng = position.lng();

            const normalizeCity = removeDiacriticsAndLowercase(town.long_name);

            updateUser({ ...user, city: normalizeCity, coords: { lat, lng } });
            setMarker(position, gMap, place.name);
          } else {
            console.log("Town or position not found in the place details.");
          }
        }
      });
    }
  }, [isLoaded, mapRef]);

  const setMarker = (location, map, name) => {
    console.log("THE MARKER IS:", location, map, name);

    if (!map) return;

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
        {profileEdit && (
          <input
            ref={placeAuthCompleteRef}
            type="text"
            className="form-control mb-3"
            placeholder="Enter location"
          />
        )}
      </div>
      {isLoaded ? (
        <div style={{ height: "600px" }} ref={mapRef} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
