import React from 'react';
import { FaHome, FaUsers, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-3xl shadow-lg p-8 sm:p-12 text-center mb-16">

  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6">
    Building Better Ways To
    <br />
    <span className="text-blue-600">
      Find Your Dream Home
    </span>
  </h1>


  <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">
    GharBasao is a modern real estate platform that connects
    buyers, sellers, renters, and property owners in one place.
    Discover verified properties and make your real estate journey
    simple and transparent.
  </p>


</div>


      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">


        <div className="bg-white rounded-2xl shadow-md border p-8 text-center hover:shadow-xl transition">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600">
            <FaHome />
          </div>

          <h2 className="text-xl font-semibold mb-3">
            Find Properties
          </h2>

          <p className="text-gray-600">
            Explore verified homes for rent and sale with complete details.
          </p>

        </div>



        <div className="bg-white rounded-2xl shadow-md border p-8 text-center hover:shadow-xl transition">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600">
            <FaUsers />
          </div>

          <h2 className="text-xl font-semibold mb-3">
            Connect Easily
          </h2>

          <p className="text-gray-600">
            Directly communicate with property owners without complications.
          </p>

        </div>



        <div className="bg-white rounded-2xl shadow-md border p-8 text-center hover:shadow-xl transition">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-100 flex items-center justify-center text-3xl text-orange-600">
            <FaHandshake />
          </div>

          <h2 className="text-xl font-semibold mb-3">
            Trusted Experience
          </h2>

          <p className="text-gray-600">
            Making buying, selling, and renting simple and reliable.
          </p>

        </div>


      </div>



      {/* Mission Section */}
      <div className="bg-blue-50 rounded-3xl p-8 sm:p-12 text-center">

        <h2 className="text-3xl font-bold text-slate-800 mb-5">
          Our Mission
        </h2>

        <p className="text-gray-700 text-lg leading-8 max-w-4xl mx-auto">
          Our mission is to simplify real estate by providing a platform
          where users can discover properties, compare options, and connect
          directly with owners. We aim to make finding a home easier,
          faster, and more transparent.
        </p>

      </div>
      {/* Call To Action */}
<div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">

  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
    Ready To Find Your Dream Home?
  </h2>

  <p className="text-blue-100 text-lg mb-8">
    Explore properties, connect with owners, and make your move easier.
  </p>

  <a
    href="/search"
    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
  >
    Explore Properties
  </a>

</div>


    </div>
  );
}