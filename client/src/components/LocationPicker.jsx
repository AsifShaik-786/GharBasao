import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';

/* =========================
   MARKER COMPONENT
========================= */
function LocationMarker({ onLocationSelect, selectedPosition }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (selectedPosition?.lat && selectedPosition?.lng) {
      setPosition([selectedPosition.lat, selectedPosition.lng]);
    }
  }, [selectedPosition]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}

/* =========================
   FLY TO LOCATION
========================= */
function FlyToLocation({ selectedPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPosition?.lat && selectedPosition?.lng) {
      map.flyTo(
        [selectedPosition.lat, selectedPosition.lng],
        16,
        {
          animate: true,
          duration: 1.5,
        }
      );
    }
  }, [selectedPosition, map]);

  return null;
}

/* =========================
   MAIN COMPONENT
========================= */
export default function LocationPicker({
  onLocationSelect,
  selectedPosition,
}) {
  return (
    <div className="rounded-lg overflow-hidden border">
      <MapContainer
        center={[17.385, 78.4867]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation selectedPosition={selectedPosition} />

        <LocationMarker
          onLocationSelect={onLocationSelect}
          selectedPosition={selectedPosition}
        />
      </MapContainer>
    </div>
  );
}