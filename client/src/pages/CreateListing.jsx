import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker';


export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

const [files, setFiles] = useState([]);
const [uploading, setUploading] = useState(false);
const [uploadError, setUploadError] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
const [selectedPosition, setSelectedPosition] = useState(null);
 const [formData, setFormData] = useState({
  imageUrls: [],
  name: '',
  description: '',
  address: '',
  type: 'rent',
preferredTenant: 'anyone',
  bedrooms: 1,
  bathrooms: 1,
  regularPrice: 50,
  discountPrice: 0,
  offer: false,
  parking: false,
  furnished: false,
  phone: '',
  email: '',
  whatsapp: '',
  ownerName: '',
latitude: null,
longitude: null,
});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }


    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
 if (
  e.target.type === 'number' ||
  e.target.type === 'text' ||
  e.target.type === 'email' ||
  e.target.type === 'textarea' ||
  e.target.tagName === 'SELECT'
) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
 const findOnMap = async () => {
  if (!formData.address.trim()) {
    alert("Please enter an address first.");
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        formData.address
      )}`
    );

    const data = await response.json();
console.log("You searched:", formData.address);
console.log("Results:", data);
console.log("Nominatim Result:", data);

if (data.length === 0) {
  alert("Address not found.");
  return;
}

// TAKE FIRST BEST RESULT
const best = data[0];

const lat = parseFloat(best.lat);
const lng = parseFloat(best.lon);

// UPDATE FORM DATA
setFormData((prev) => ({
  ...prev,
  latitude: lat,
  longitude: lng,
}));

// ALSO UPDATE THE MAP POSITION
setSelectedPosition({
  lat,
  lng,
});

alert("Location selected on map!");
  } catch (error) {
    console.error(error);
    alert("Something went wrong while searching.");
  }
};

// const storeImage = async (file) => {
//   return new Promise((resolve, reject) => {
//     const storage = getStorage(app);

//     const fileName = new Date().getTime() + "-" + file.name;

//     const storageRef = ref(storage, fileName);

//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//         setUploadProgress(Math.round(progress));
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           resolve(downloadURL);
//         });
//       }
//     );
//   });
// };

const storeImage = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "gharbasao_upload");
  data.append("cloud_name", "dhpmo81bq");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dhpmo81bq/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const uploadedImage = await res.json();

  return uploadedImage.secure_url;
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!currentUser) {
      return setError('You must be logged in');
    }

    if (+formData.regularPrice < +formData.discountPrice) {
      return setError('Discount price must be lower than regular price');
    }

    setLoading(true);
    setError(false);

    // STEP 1: Upload images
    let imageUrls = [];

    if (files.length > 0) {
      setUploading(true);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      imageUrls = await Promise.all(promises);

      setUploading(false);
    }

    // STEP 2: Send data to backend
    const res = await fetch('/api/listing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        ...formData,
        imageUrls,
        userRef: currentUser._id,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success === false) {
      setError(data.message);
      return;
    }

    navigate(`/listing/${data._id}`);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">

        {/* LEFT */}
<div className="flex flex-col gap-4 flex-1">

  <input
    type="text"
    placeholder="Name(BHK,2BHK,VILLA....)"
    className="border p-3 rounded-lg"
    id="name"
    required
    onChange={handleChange}
    value={formData.name}
  />

  <textarea
    placeholder="Description(About Property)"
    className="border p-3 rounded-lg"
    id="description"
    required
    onChange={handleChange}
    value={formData.description}
  />

  <div className="flex items-center gap-2">
  <input
    type="text"
    placeholder="Address"
    className="border p-3 rounded-lg flex-1"
    id="address"
    required
    onChange={handleChange}
    value={formData.address}
  />

 <button
  type="button"
  onClick={findOnMap}
  className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
  📍 Find on Map
</button>
</div>

  {/* CONTACT DETAILS */}
  <input
  type="text"
  id="ownerName"
  placeholder="Owner Name"
  className="border p-3 rounded-lg"
  onChange={handleChange}
  value={formData.ownerName}
/>
  <input
    type="text"
    id="phone"
    placeholder="Phone Number"
    className="border p-3 rounded-lg"
    onChange={handleChange}
    value={formData.phone}
  />

  <input
    type="email"
    id="email"
    placeholder="Email"
    className="border p-3 rounded-lg"
    onChange={handleChange}
    value={formData.email}
  />

  <input
    type="text"
    id="whatsapp"
    placeholder="WhatsApp Number"
    className="border p-3 rounded-lg"
    onChange={handleChange}
    value={formData.whatsapp}
  />

          {/* CHECKBOX */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" onChange={handleChange} />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" onChange={handleChange} />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" onChange={handleChange} />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" onChange={handleChange} />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" onChange={handleChange} />
              <span>This property is on Offer</span>
            </div>
          </div>

          {formData.type === 'rent' && (
  <div className="flex flex-col gap-2">
    <label className="font-semibold">
      Preferred Tenant
    </label>

    <select
      id="preferredTenant"
      value={formData.preferredTenant}
      onChange={handleChange}
      className="border p-3 rounded-lg"
    >
      <option value="anyone">Anyone</option>
      <option value="family">Family</option>
      <option value="bachelor">Bachelor</option>
    </select>
  </div>
)}

 {/* PROPERTY DETAILS */}

<label className="font-semibold">Bedrooms</label>
<input
  type="number"
  id="bedrooms"
  min="1"
  max="10"
  required
  onChange={handleChange}
  value={formData.bedrooms}
  className="border p-3 rounded-lg"
/>

<label className="font-semibold">Bathrooms</label>
<input
  type="number"
  id="bathrooms"
  min="1"
  max="10"
  required
  onChange={handleChange}
  value={formData.bathrooms}
  className="border p-3 rounded-lg"
/>

<label className="font-semibold">
  Regular Price <span className="text-gray-500 text-sm">(₹)</span>
</label><input
  type="number"
  id="regularPrice"
  min="50"
  required
  onChange={handleChange}
  value={formData.regularPrice}
  className="border p-3 rounded-lg"
/>

{formData.offer && (
  <>
<label className="font-semibold">
  Offer Price <span className="text-gray-500 text-sm">(₹)</span>
</label>
    <input
      type="number"
      id="discountPrice"
      min="0"
      required
      onChange={handleChange}
      value={formData.discountPrice}
      className="border p-3 rounded-lg"
    />
    <p className="text-xs text-gray-500">
  Offer price must be lower than the regular price.
</p>
  </>
  
)}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col flex-1 gap-4">

          <div className="border rounded-lg p-4 bg-gray-50">

  <h3 className="text-lg font-semibold mb-2">
    📸 Property Images
  </h3>

  <p className="text-sm text-gray-600 mb-4">
    Upload <strong>4–6 clear photos</strong> of your property.
    Good-quality images attract more buyers and tenants.
  </p>

  <input
    type="file"
    multiple
    accept="image/*"
    className="w-full border p-3 rounded-lg bg-white"
    onChange={(e) => {
      console.log("Selected files:", e.target.files);
      console.log("Number of files:", e.target.files.length);
      setFiles(e.target.files);
    }}
  />

  {files.length > 0 && (
    <p className="text-green-600 mt-3 font-medium">
      ✅ {files.length} image{files.length > 1 ? "s" : ""} selected
    </p>
  )}

</div>
          {uploading && (
  <p className="text-blue-600">
    Uploading Images... {uploadProgress}%
  </p>
)}
          <h2 className="text-lg font-semibold">
  Select Property Location
</h2>

<p className="text-sm text-gray-600 mb-2">
  Search your area, then click the exact property location on the map.
</p>

<LocationPicker
  onLocationSelect={(lat, lng) => {
    setSelectedPosition({ lat, lng });

    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  }}
  selectedPosition={selectedPosition}
/>
{formData.latitude && formData.longitude && (
  <div className="bg-gray-100 p-3 rounded-lg text-sm">
    <p>
      <strong>Latitude:</strong> {formData.latitude.toFixed(6)}
    </p>
    <p>
      <strong>Longitude:</strong> {formData.longitude.toFixed(6)}
    </p>
  </div>
)}
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg"
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </form>
    </main>
  );
}