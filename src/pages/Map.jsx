import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder";

function Map() {
  const map = useRef(null);

  useEffect(() => {
    // Check if map is already initialized
    if (!map.current) {
      // Initialize map
      map.current = L.map("mapId").setView([-21.4496785, 47.0588194], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.current);
    }

    // Marquer de position de l'ENI
    const automaticMarker = L.marker([-21.4551733, 47.093199], 19.5).addTo(
      map.current
    );
    // popup
    automaticMarker.bindPopup("Ecole Nationale d'Informatique").openPopup();

    //geolocation API pour avoir la position actuelle
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Marquer du position actuelle
      const userMarker = L.marker([latitude, longitude]).addTo(map.current);
      // Popup
      userMarker.bindPopup("Votre position actuelle").openPopup();

      // Creation du trajet entre eni et position actuelle
      L.Routing.control({
        waypoints: [
          L.latLng(automaticMarker.getLatLng()), // coordonnées de l'eni
          L.latLng(userMarker.getLatLng()), // coordonnées de la position actuelle
        ],
      }).addTo(map.current);

      map.current.panTo([latitude, longitude]);
    });
  }, []);

  return <div id="mapId" style={{ height: "100vh", width: "100vw" }}></div>;
}

export default Map;
