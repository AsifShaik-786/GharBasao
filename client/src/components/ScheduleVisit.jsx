import { useState } from 'react';

export default function ScheduleVisit({ listingId }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/visit/create/${listingId}`,
  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }
);

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
      } else {
        alert('Visit scheduled successfully!');

        setFormData({
          date: '',
          time: '',
          message: '',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-4 mt-4 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">📅 Schedule a Visit</h2>

      <input
        type="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="time"
        id="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <textarea
        id="message"
        placeholder="Message (optional)"
        value={formData.message}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        {loading ? 'Scheduling...' : 'Schedule Visit'}
      </button>
    </form>
  );
}