import { useEffect, useState } from 'react';

export default function VisitRequests() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/visit/owner`,
  {
    credentials: 'include',
  }
);

        const data = await res.json();

        if (res.ok) {
          setVisits(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const updateStatus = async (visitId, status) => {
    try {
     const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/visit/status/${visitId}`,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status }),
  }
);

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setVisits((prev) =>
        prev.map((visit) =>
          visit._id === visitId
            ? { ...visit, status }
            : visit
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600';
      case 'Rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Visit Requests
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : visits.length === 0 ? (
        <p>No visit requests yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {visits.map((visit) => (
            <div
              key={visit._id}
              className="bg-white shadow-md rounded-xl border p-5"
            >
              <h2 className="text-xl font-bold mb-3">
                🏠 {visit.listingId?.name}
              </h2>

              <p>
                <strong>Visitor:</strong>{' '}
                {visit.visitorId?.username}
              </p>

              <p>
                <strong>Email:</strong>{' '}
                {visit.visitorId?.email}
              </p>

              <p>
                <strong>Date:</strong> {visit.date}
              </p>

              <p>
                <strong>Time:</strong> {visit.time}
              </p>

              <p>
                <strong>Message:</strong>{' '}
                {visit.message || 'No message'}
              </p>

              <p className={`font-bold mt-2 ${getStatusColor(visit.status)}`}>
                Status: {visit.status}
              </p>

              {visit.status === 'Pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(visit._id, 'Accepted')
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(visit._id, 'Rejected')
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}