import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
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

    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Add a marker for the user's current location 
          const userMarker = L.marker([latitude, longitude]).addTo(map.current);
          // Popup for the user's marker
          userMarker.bindPopup("Your Current Location").openPopup();
  
          // Add a marker to the map (e.g., Ecole Nationale d'Informatique)
          const marker = L.marker([-21.4551733, 47.093199], 19.05).addTo(map.current);
          // Popup for the marker
          marker.bindPopup("Ecole Nationale d'Informatique!").openPopup();
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );

  }, []);

  return <div id="mapId" style={{ height: "100vh", width: "100vw" }}></div>;
}

export default Map;
