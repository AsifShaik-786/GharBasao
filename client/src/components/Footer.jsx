import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-blue-500">Ghar</span>
              <span className="text-white">Basao</span>
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Helping people find the perfect home with trusted listings,
              verified owners and a smooth buying, renting and selling
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/search" className="hover:text-blue-400 transition">
                  Properties
                </Link>
              </li>

              <li>
                <Link to="/sign-in" className="hover:text-blue-400 transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p className="flex items-center gap-3">
                <FaEnvelope />
                support@gharbasao.com
              </p>

              <p className="flex items-center gap-3">
                <FaPhoneAlt />
                +91 7842302412
              </p>

              <p className="flex items-center gap-3">
                <FaMapMarkerAlt />
                India
              </p>

            </div>
          </div>

          {/* Social */}
<div>
  <h3 className="text-white font-semibold text-lg mb-4">
    Follow Us
  </h3>

  <div className="flex gap-4 text-xl">

    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition duration-300"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 transition duration-300"
    >
      <FaInstagram />
    </a>

    <a
      href="https://www.linkedin.com/in/shaikasif2"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 transition duration-300"
    >
      <FaLinkedinIn />
    </a>

    <a
      href="https://github.com/AsifShaik-786"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gray-700 transition duration-300"
    >
      <FaGithub />
    </a>

  </div>
</div>

</div>

<div className="border-t border-slate-700 mt-10 pt-6 text-center space-y-3">

  <p className="text-gray-400 text-sm">
    © {new Date().getFullYear()}{" "}
    <span className="font-semibold text-white">
      GharBasao
    </span>. All Rights Reserved.
  </p>

  <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
    Made with
    <FaHeart className="text-red-500 animate-pulse" />
    by
    <span className="font-semibold text-white">
      Asif Shaik
    </span>
  </p>

</div>

</div>
</footer>
  );
}