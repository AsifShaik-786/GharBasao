import { useEffect, useState } from 'react';
import {
  FaHospital,
  FaSchool,
  FaShoppingCart,
  FaGasPump,
  FaUniversity,
} from 'react-icons/fa';

export default function NearbyPlaces({ latitude, longitude }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchNearbyPlaces = async () => {
      try {
        setLoading(true);

        const query = `
[out:json];
(
  node(around:1500,${latitude},${longitude})["amenity"="hospital"];
  node(around:1500,${latitude},${longitude})["amenity"="school"];
  node(around:1500,${latitude},${longitude})["shop"="supermarket"];
  node(around:1500,${latitude},${longitude})["amenity"="fuel"];
  node(around:1500,${latitude},${longitude})["amenity"="atm"];
);
out body;
`;

        const res = await fetch(
          'https://overpass-api.de/api/interpreter',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain',
              Accept: 'application/json',
            },
            body: query,
          }
        );

        // If API fails, don't crash the page
        if (!res.ok) {
          console.log('Overpass API Error:', res.status);
          setPlaces([]);
          setLoading(false);
          return;
        }

        const contentType = res.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          console.log('Response is not JSON');
          setPlaces([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setPlaces(data.elements || []);
      } catch (err) {
        console.log('Nearby Places Error:', err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [latitude, longitude]);

  const getIcon = (place) => {
    if (place.tags?.amenity === 'hospital')
      return <FaHospital className="text-red-600" />;

    if (place.tags?.amenity === 'school')
      return <FaSchool className="text-blue-600" />;

    if (place.tags?.shop === 'supermarket')
      return <FaShoppingCart className="text-green-600" />;

    if (place.tags?.amenity === 'fuel')
      return <FaGasPump className="text-orange-500" />;

    if (place.tags?.amenity === 'atm')
      return <FaUniversity className="text-purple-600" />;

    return null;
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Nearby Places
      </h2>

      {loading && (
        <p className="text-gray-500">Loading nearby places...</p>
      )}

      {!loading && places.length === 0 && (
        <p className="text-gray-500">
          Nearby places are currently unavailable.
        </p>
      )}

      {!loading && places.length > 0 && (
        <div className="space-y-3">
          {places.slice(0, 8).map((place) => (
            <div
              key={place.id}
              className="flex items-center gap-3 border rounded-lg p-3 bg-white"
            >
              <div className="text-xl">
                {getIcon(place)}
              </div>

              <div>
                <p className="font-medium">
                  {place.tags?.name || 'Unnamed Place'}
                </p>

                <p className="text-sm text-gray-500">
                  {place.tags?.amenity || place.tags?.shop}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}