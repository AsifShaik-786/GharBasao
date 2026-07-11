import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
 import ScheduleVisit from '../components/ScheduleVisit';
 
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaDirections,
  FaWhatsapp,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import NearbyPlaces from '../components/NearbyPlaces';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.
function ClickMarker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return null;
}
export default function Listing() {
  const [listing, setListing] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`
);        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setListing(data);

setSelectedLocation({
  lat: data.latitude,
  lng: data.longitude,
});
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
       
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(`
🏡 Check out this property on Ghar Basao!

${listing.name}

📍 ${listing.address}

💰 ₹${
  listing.offer
    ? listing.discountPrice
    : listing.regularPrice
}
🔗 ${window.location.href}
`);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className="flex flex-wrap gap-3">

  <button
    onClick={() =>
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${listing.latitude},${listing.longitude}`,
        "_blank"
      )
    }
    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition"
  >
    <FaDirections />
    Get Directions
  </button>

  <button
    onClick={() => {
      const message =
`🏡 Check out this property on Ghar Basao!

${listing.name}

📍 ${listing.address}

💰 ₹${listing.offer ? listing.discountPrice : listing.regularPrice}

${window.location.href}`;

      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }}
    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg transition"
  >
    <FaWhatsapp />
    Share on WhatsApp
  </button>
</div>
            <div className="flex flex-wrap gap-3">

  <p className="bg-red-900 text-white px-4 py-2 rounded-md">
    {listing.type === 'rent' ? '🏠 For Rent' : '🏡 For Sale'}
  </p>

  <p
    className={`px-4 py-2 rounded-md text-white font-semibold ${
      listing.status === 'available'
        ? 'bg-green-600'
        : 'bg-red-600'
    }`}
  >
    {listing.status === 'available'
      ? '🟢 Available'
      : listing.type === 'rent'
      ? '🔴 Rented'
      : '🔴 Sold'}
  </p>

  {listing.offer && (
    <p className="bg-green-700 text-white px-4 py-2 rounded-md">
      ₹{(+listing.regularPrice - +listing.discountPrice).toLocaleString()} OFF
    </p>
  )}

</div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {listing.status === 'available' &&
 currentUser &&
 listing.userRef !== currentUser._id &&
 !contact && (
  <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
   {listing.status === 'available' &&
 currentUser &&
 listing.userRef !== currentUser._id && (
  <ScheduleVisit listingId={listing._id} />
)}

{listing.latitude && listing.longitude && (
  <>
    <h2 className="text-2xl font-semibold mt-8">
      Property Location
    </h2>

    <div className="rounded-lg overflow-hidden border h-[400px]">
      <MapContainer
        center={[listing.latitude, listing.longitude]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

<Marker position={[listing.latitude, listing.longitude]} />

<ClickMarker
  onSelect={(latlng) => {
    setSelectedLocation({
      lat: latlng.lat,
      lng: latlng.lng,
    });
  }}
/>

{selectedLocation && (
  <Marker
    position={[
      selectedLocation.lat,
      selectedLocation.lng,
    ]}
  />
)}      </MapContainer>
    </div>
  </>
)}

{listing.latitude && listing.longitude && (
 <NearbyPlaces
  latitude={selectedLocation?.lat}
  longitude={selectedLocation?.lng}
/>
)}
          </div>
  <div className="max-w-4xl mx-auto mt-12 mb-10 px-4">
  <div className="bg-slate-50 border rounded-2xl p-8 text-center shadow-sm">

    <h2 className="text-2xl font-bold text-slate-800">
      🏡 Looking for More Similar Properties?
    </h2>

    <p className="text-gray-600 mt-3">
      Explore more verified {listing.type === 'rent' ? 'rental' : 'sale'} properties
      that match your needs.
    </p>

    <Link
      to={`/search?type=${listing.type}`}
      className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
    >
      View Similar Properties →
    </Link>

  </div>
</div>
        </div>
      )}
    </main>
  );
}
