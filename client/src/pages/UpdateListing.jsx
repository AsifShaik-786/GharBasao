import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
const [files, setFiles] = useState([]);
const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    preferredTenant: 'anyone',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    imageUrls: [],
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setFormData(data);
      } catch (err) {
        setError('Failed to load listing');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);
    setError('');

    const res = await fetch(`/api/listing/update/${listingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    });

    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    navigate(`/listing/${data._id}`);
  } catch (err) {
    setSaving(false);
    setError('Failed to update listing.');
  }
};

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading listing...
      </h2>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Edit Property
      </h1>

      {error && (
        <p className="text-red-600 text-center mb-5">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

  <input
    type="text"
    id="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Property Title"
    className="border rounded-lg p-3"
  />
<div className="flex flex-col gap-2">
  <label className="font-semibold">Property Status</label>

  <select
    id="status"
    value={formData.status || "available"}
    onChange={handleChange}
    className="border rounded-lg p-3"
  >
    <option value="available">🟢 Available</option>

    {formData.type === "rent" ? (
      <option value="rented">🔴 Rented</option>
    ) : (
      <option value="sold">🔴 Sold</option>
    )}
  </select>
</div>
  <textarea
    id="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Property Description"
    rows="5"
    className="border rounded-lg p-3"
  />

  <input
    type="text"
    id="address"
    value={formData.address}
    onChange={handleChange}
    placeholder="Property Address"
    className="border rounded-lg p-3"
  />
{formData.type === "rent" && (
  <div className="flex flex-col gap-2">
    <label className="font-semibold">
      Preferred Tenant
    </label>

    <select
      id="preferredTenant"
      value={formData.preferredTenant || "anyone"}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="anyone">Anyone</option>
      <option value="family">Family</option>
      <option value="bachelor">Bachelor</option>
    </select>
  </div>
)}
 <div className="grid grid-cols-2 gap-4">

  <div>
    <label className="block font-medium mb-2">
      🛏 Bedrooms
    </label>
    <input
      type="number"
      id="bedrooms"
      value={formData.bedrooms}
      onChange={handleChange}
      className="border rounded-lg p-3 w-full"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      🛁 Bathrooms
    </label>
    <input
      type="number"
      id="bathrooms"
      value={formData.bathrooms}
      onChange={handleChange}
      className="border rounded-lg p-3 w-full"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      💰 Regular Price
    </label>
    <input
      type="number"
      id="regularPrice"
      value={formData.regularPrice}
      onChange={handleChange}
      className="border rounded-lg p-3 w-full"
    />
  </div>

  <div>
    <label className="block font-medium mb-2">
      🏷 Discount Price
    </label>
    <input
      type="number"
      id="discountPrice"
      value={formData.discountPrice}
      onChange={handleChange}
      className="border rounded-lg p-3 w-full"
    />
  </div>

</div>
  <div className="border rounded-lg p-4 bg-gray-50">

  <h3 className="text-lg font-semibold mb-2">
    📸 Property Images
  </h3>

  <p className="text-sm text-gray-600 mb-4">
    Upload 4–6 clear photos of your property.
    Selecting new images will replace the current images.
  </p>

  <input
    type="file"
    multiple
    accept="image/*"
    className="w-full border p-3 rounded-lg bg-white"
    onChange={(e) => setFiles(e.target.files)}
  />

  {files.length > 0 && (
    <p className="text-green-600 mt-3 font-medium">
      ✅ {files.length} image{files.length > 1 ? "s" : ""} selected
    </p>
  )}

</div>
<button
  type="submit"
  disabled={saving}
  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
>
  {saving ? 'Saving...' : 'Save Changes'}
</button>
</form>
    </main>
  );
}