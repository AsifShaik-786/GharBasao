import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaHome, FaRupeeSign, FaPhoneAlt } from 'react-icons/fa';

export default function Home() {
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();
  SwiperCore.use([Navigation]);
  //console.log(offerListings);
  useEffect(() => {
    // const fetchOfferListings = async () => {
    //   try {
    //     const res = await fetch('/api/listing/get?offer=true&limit=4');
    //     const data = await res.json();
    //     setOfferListings(data);
    //     fetchRentListings();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
       console.log(error);
      }
    };
fetchRentListings();
  },
   []);
  const handleSearch = (e) => {
  e.preventDefault();

  if (!searchTerm.trim()) return;

  navigate(`/search?searchTerm=${searchTerm}`);
};
  return (
    <div>
      {/* top */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
  <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-3xl shadow-lg overflow-hidden">
    <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 text-center lg:text-left space-y-6">
           <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
  Find Your <span className='text-blue-600'>Dream Home</span>
  <br />
  with <span className='text-slate-700'>Ghar Basao</span>
</h1>

<p className="text-base sm:text-lg lg:text-xl font-semibold text-blue-600 uppercase tracking-wider">  Find • Buy • Sell • Rent
</p>

<div className="max-w-2xl text-gray-600 text-base sm:text-lg leading-8">  Your Dream Home Starts Here.
  <br />
  Explore verified properties, connect with owners, and find the perfect
  place to call home.
</div>

<div className="flex flex-col sm:flex-row gap-4 pt-2">
    <Link
    to={'/search'}
    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-center"
  >
    Explore Properties
  </Link>

  <Link
    to={'/search?type=rent'}
    className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-center"
  >
    Rent a Home
  </Link>
</div>  
         <form
  onSubmit={handleSearch}
  className="mt-8 w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-3 flex flex-col sm:flex-row gap-3"
>
  <input
    type='text'
    placeholder='Search by city, locality, or property name...'
    className="flex-1 border-0 bg-transparent px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 text-base"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <button
    type='submit'
   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap"
  >
    🔍 Search
  </button>
</form>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-2xl">

  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center hover:shadow-lg transition-all duration-300">
  <h3 className="text-3xl font-bold text-blue-600">500+</h3>
  <p className="mt-1 text-gray-600 font-medium">Properties</p>
</div>

  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center hover:shadow-lg transition-all duration-300">
  <h3 className="text-3xl font-bold text-blue-600">200+</h3>
  <p className="mt-1 text-gray-600 font-medium">Happy Families</p>
</div>

  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center hover:shadow-lg transition-all duration-300">
  <h3 className="text-3xl font-bold text-blue-600">50+</h3>
  <p className="mt-1 text-gray-600 font-medium">Cities Covered</p>
</div>
</div>
    </div>
  </div>
</div>
      

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600">
  <FaHome />
</div>
      <h3 className='text-xl font-semibold'>Verified Listings</h3>
      <p className='text-gray-500 mt-2'>
        Browse trusted properties with complete details.
      </p>
    </div>

    <div className='bg-white shadow-md rounded-xl p-6 text-center border hover:shadow-xl transition'>
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600">
  <FaRupeeSign />
</div>
      <h3 className='text-xl font-semibold'>Best Prices</h3>
      <p className='text-gray-500 mt-2'>
        Compare prices and choose the property that fits your budget.
      </p>
    </div>

    <div className='bg-white shadow-md rounded-xl p-6 text-center border hover:shadow-xl transition'>
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-3xl text-red-500">
  <FaPhoneAlt />
</div>
      <h3 className="text-xl font-bold text-gray-900">Direct Contact</h3>
      <p className="mt-3 text-gray-600 leading-7">
        Connect directly with property owners or agents.
      </p>
    </div>

  </div>
</div>
{/* Listings Section */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">

  {/* Homes for Rent */}
  {rentListings && rentListings.length > 0 && (
    <div>
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Homes for Rent
          </h2>

          <p className="text-gray-500 mt-1">
            Discover comfortable rental homes near you.
          </p>
        </div>

        <Link
          className="font-semibold text-blue-600 hover:text-blue-700 transition"
          to="/search?type=rent"
        >
          Show more →
        </Link>

      </div>

      <div className="flex flex-wrap gap-4">
        {rentListings.map((listing) => (
          <ListingItem 
            listing={listing} 
            key={listing._id}
          />
        ))}
      </div>
    </div>
  )}


  {/* Homes for Sale */}
  {saleListings && saleListings.length > 0 && (
    <div>

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Homes for Sale
          </h2>

          <p className="text-gray-500 mt-1">
            Explore verified properties available for purchase.
          </p>
        </div>

        <Link
          className="font-semibold text-blue-600 hover:text-blue-700 transition"
          to="/search?type=sale"
        >
          Show more →
        </Link>

      </div>


      <div className="flex flex-wrap gap-4">
        {saleListings.map((listing) => (
          <ListingItem
            key={listing._id}
            listing={listing}
          />
        ))}
      </div>

    </div>
  )}

</div>
</div>
);
}