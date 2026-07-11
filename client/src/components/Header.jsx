import {
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaHeart,
  FaUserCircle,
} from 'react-icons/fa';import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//import { FaBars, FaTimes } from 'react-icons/fa';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

 return (
  <header className="bg-white shadow-md sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex items-center justify-between h-16">


        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
    <FaHome className="text-white text-lg" />
  </div>

  <h1 className="text-2xl font-semibold tracking-wide">
    <span className="text-blue-600">Ghar</span>
    <span className="text-slate-800">Basao</span>
  </h1>

</Link>



        {/* Navigation */}
        <button
  className="sm:hidden text-2xl text-slate-700"
  onClick={() => setOpenMenu(!openMenu)}
>
  {openMenu ? <FaTimes /> : <FaBars />}
</button>
        <nav
className={`
sm:block
absolute top-16 left-0
w-full
sm:static sm:w-auto

transition-all duration-300 ease-in-out

${openMenu 
? 'opacity-100 translate-y-0 visible'
: 'opacity-0 -translate-y-5 invisible sm:visible sm:opacity-100 sm:translate-y-0'
}

`}
>

<ul className="
flex flex-col sm:flex-row 
items-center 
gap-3 sm:gap-6

bg-white
backdrop-blur-lg

sm:bg-transparent

mx-4 sm:mx-0
mt-3 sm:mt-0

p-5 sm:p-0

rounded-3xl
shadow-xl sm:shadow-none

border border-gray-100 sm:border-none
">

            <Link 
  to="/" 
  onClick={() => setOpenMenu(false)}
>
  <li className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 transition">
  <FaHome className="text-blue-600" />
  Home
</li>
</Link>


            <Link 
  to="/about"
  onClick={() => setOpenMenu(false)}
>
     <li className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 transition">
  <FaInfoCircle className="text-blue-600" />
  About
</li>
            </Link>



            {currentUser && (

              <Link 
  to="/wishlist"
  onClick={() => setOpenMenu(false)}
>

     <li className="flex items-center gap-3 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition">
  <FaHeart />
  Wishlist
</li>
              </Link>

            )}



            <Link 
  to="/profile"
  onClick={() => setOpenMenu(false)}
>

              {currentUser ? (

                <img
                  className="rounded-full h-10 w-10 object-cover border-2 border-blue-500"
                  src={currentUser.avatar}
                  alt="profile"
                />

              ) : (

               <li className="flex items-center gap-3 bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
  <FaUserCircle />
  Sign In
</li>

              )}

            </Link>


          </ul>

        </nav>


      </div>

    </div>

  </header>
);
}