import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

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

    // Add a marker to the map
    const marker = L.marker([-21.4551733,47.0931990], 19.05).addTo(map.current);

    // Optional: Bind a popup to the marker
    marker.bindPopup("Ecole Nationale d'Informatique!").openPopup();
  }, []);

  return <div id="mapId" style={{ height: "100vh", width: "100vw" }}></div>;
}

export default Map;
