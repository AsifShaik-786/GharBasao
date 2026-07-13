import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
}, [file]);

useEffect(() => {
  handleShowListings();
}, []);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`, {
  credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
  credentials: 'include',
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
  credentials: 'include',
});
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/user/listings/${currentUser._id}`,
  {
    credentials: 'include',
  }
);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/listing/delete/${listingId}`,
  {
    method: 'DELETE',
    credentials: 'include',
  }
);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
  My Profile
</h1>
      <form
  onSubmit={handleSubmit}
  className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 flex flex-col gap-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <div className="flex flex-col items-center">
  <img
    onClick={() => fileRef.current.click()}
    src={formData.avatar || currentUser.avatar}
    alt="profile"
    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg cursor-pointer hover:scale-105 hover:border-blue-600 transition duration-300"
  />

  {/* <p className="mt-3 text-sm text-gray-500">
    Click the photo to change your profile picture
  </p> */}
</div>
        <p className="text-sm text-center font-medium">
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"        />
        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          to={'/create-listing'}
        >
          Create Listing
        </Link>
        <Link
className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-center font-semibold transition-all duration-300 shadow-md hover:shadow-lg"  to='/wishlist'
>
  ❤️ My Wishlist
</Link>

<Link
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-center font-semibold transition-all duration-300 shadow-md hover:shadow-lg"  to='/visit-requests'
>
  📅 Visit Requests
</Link>
      </form>
     <div className="flex flex-col sm:flex-row gap-4 mt-6">
  <button
    type="button"
    onClick={handleDeleteUser}
    className="flex-1 border-2 border-red-500 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
  >
    🗑 Delete Account
  </button>

  <button
    type="button"
    onClick={handleSignOut}
    className="flex-1 border-2 border-slate-700 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-700 hover:text-white transition-all duration-300"
  >
    🚪 Sign Out
  </button>
</div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      {/* <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button> */}
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
<div className="flex flex-col gap-6 mt-10">
            <div className="text-center mb-8">
  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
    My Properties
  </h2>

  <p className="text-gray-500 mt-2">
    Manage, edit, and monitor all your property listings.
  </p>
</div>
       {userListings.map((listing) => (
  <div
  key={listing._id}
  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>
    <div className="flex flex-col md:flex-row">

      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="w-full md:w-72 h-56 object-cover hover:scale-105 transition duration-500"
        />
      </Link>

      <div className="flex-1 p-6 flex flex-col justify-between">

        <div>

          <Link
            to={`/listing/${listing._id}`}
            className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition"
          >
            {listing.name}
          </Link>

          <p className="text-gray-500 mt-2">
            📍 {listing.address}
          </p>

          <div className="flex gap-3 mt-4 flex-wrap">

            <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">
              🛏 {listing.bedrooms} Beds
            </span>

            <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
              🛁 {listing.bathrooms} Baths
            </span>

            <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm">
              {listing.type === "rent" ? "🏠 Rent" : "🏡 Sale"}
            </span>

          </div>

        </div>

        <div className="flex justify-between items-center mt-6">

          <div>

            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-xl">
  <span className="text-2xl font-bold">
    ₹ {listing.offer ? listing.discountPrice : listing.regularPrice}
  </span>
</div>

            {listing.type === "rent" && (
             <span className="ml-2 text-gray-500 font-medium">
  / month
</span>
            )}

          </div>

          <div className="flex gap-3">

            <Link to={`/update-listing/${listing._id}`}>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Edit
              </button>
            </Link>

            <button
              onClick={() => handleListingDelete(listing._id)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}
