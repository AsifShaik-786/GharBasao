import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishlistSuccess } from '../redux/user/userSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ListingItem({ listing }) {
  const dispatch = useDispatch();
const { currentUser } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
  if (currentUser?.wishlist?.includes(listing._id)) {
    setIsLiked(true);
  } else {
    setIsLiked(false);
  }
}, [currentUser, listing._id]);

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  // };

  return (
<div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300 w-full sm:w-[320px] lg:w-[325px]">   
     <Link to={`/listing/${listing._id}`}>
     <div
  onClick={async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/wishlist/${listing._id}`, {
      method: 'POST',
      credentials: 'include',
    });

const data = await res.json();
console.log('Response:', data);
console.log('Status:', res.status);

    if (!res.ok) {
      console.log(data.message);
      return;
    }
dispatch(updateWishlistSuccess(data.wishlist));
setIsLiked(!isLiked);
    
  } catch (error) {
    console.log(error);
  }
}}
className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-300">
  <FaHeart
    className={`text-lg ${
      isLiked ? 'text-red-500' : 'text-gray-400'
    }`}
  />
</div>
<div className="absolute top-4 left-4 z-20">
  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
    ✓ Verified
  </span>
</div>
        <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
loop={(listing.imageUrls?.length || 0) > 1}
  className="h-[200px] sm:h-[200px] md:h-[210px]"
>
  {((listing.imageUrls?.length || 0) > 0
    ? listing.imageUrls
    : [
        "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg",
      ]
  ).map((image, index) => (
    <SwiperSlide key={index}>
      <img
        src={image}
        alt={`Property ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition duration-300"
      />
    </SwiperSlide>
  ))}
</Swiper>
<div className="p-4 flex flex-col gap-2">        
          <p className="text-lg font-bold text-gray-900 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-blue-600 text-lg flex-shrink-0" />
            <p className="text-sm text-gray-500 truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 leading-5 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">

  <span
    className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
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
  </span>

  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
    {listing.type === 'rent' ? '🏠 Rent' : '🏡 Sale'}
  </span>

  {listing.type === "rent" && listing.preferredTenant && (
    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
      {listing.preferredTenant === "family"
        ? "👨‍👩‍👧 Family"
        : listing.preferredTenant === "bachelor"
        ? "👨 Bachelor"
        : "👥 Anyone"}
    </span>
  )}

</div>
          <div className="flex items-center justify-between pt-2">
  <div>
    <p className="text-xl font-bold text-blue-600">
      ₹
      {listing.offer
        ? listing.discountPrice.toLocaleString('en-IN')
        : listing.regularPrice.toLocaleString('en-IN')}
    </p>

    {listing.type === 'rent' && (
      <p className="text-xs text-gray-500">per month</p>
    )}
  </div>

 {listing.offer && (
  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
    🔥 Best Deal
  </span>
)}
</div>
<div className="flex items-center gap-6 border-t border-gray-200 pt-3 mt-2 text-sm font-medium text-gray-700">
    <span>🛏 {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>

  <span>🛁 {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
</div>
        </div>
      </Link>
    </div>
  );
}
