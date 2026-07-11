import { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="bg-white border rounded-xl shadow-md p-5 mt-4">

          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Contact Property Owner
          </h2>

          <div className="space-y-3 text-slate-700">

            <p>
  <span className="font-semibold">👤 Owner:</span>{' '}
  {listing.ownerName || landlord.username}
</p>

            <p>
              <span className="font-semibold">📧 Email:</span>{' '}
              {listing.email || 'Not Provided'}
            </p>

            <p>
              <span className="font-semibold">📞 Phone:</span>{' '}
              {listing.phone || 'Not Provided'}
            </p>

            <p>
              <span className="font-semibold">💬 WhatsApp:</span>{' '}
              {listing.whatsapp || 'Not Provided'}
            </p>

          </div>

          {listing.whatsapp && (
            <a
              href={`https://wa.me/${listing.whatsapp}?text=Hi ${landlord.username}, I'm interested in your property "${listing.name}". Is it still available?`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-6 bg-green-600 text-white text-center p-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              💬 Chat on WhatsApp
            </a>
          )}

        </div>
      )}
    </>
  );
}