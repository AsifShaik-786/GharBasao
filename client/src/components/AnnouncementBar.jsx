// export default function AnnouncementBar() {
//   return (
//     <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-gray-200 text-blue-700 overflow-hidden whitespace-nowrap">
//       <div className="animate-marquee py-2 font-medium">

//         🏡 Verified Listings &nbsp;&nbsp; • &nbsp;&nbsp;
//         ❤️ Save Your Favourite Homes &nbsp;&nbsp; • &nbsp;&nbsp;
//         📅 Schedule Property Visits &nbsp;&nbsp; • &nbsp;&nbsp;
//         📍 Interactive Maps &nbsp;&nbsp; • &nbsp;&nbsp;
//         💬 Direct Owner Contact &nbsp;&nbsp; • &nbsp;&nbsp;
//         🚀 New Properties Added Daily

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  FaHome,
  FaHeart,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaPhoneAlt,
} from "react-icons/fa";

export default function AnnouncementBar() {
  const announcements = [
    {
      icon: <FaHome className="text-blue-600 text-lg" />,
      text: "Verified Property Listings",
    },
    {
      icon: <FaHeart className="text-red-500 text-lg" />,
      text: "Save Your Favourite Homes",
    },
    {
      icon: <FaCalendarCheck className="text-green-600 text-lg" />,
      text: "Schedule Property Visits Easily",
    },
    {
      icon: <FaMapMarkerAlt className="text-orange-500 text-lg" />,
      text: "Explore Properties with Interactive Maps",
    },
    {
      icon: <FaPhoneAlt className="text-sky-600 text-lg" />,
      text: "Connect Directly with Property Owners",
    },
    {
      icon: "🚀",
      text: "New Properties Added Daily",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-11 flex items-center justify-center">

        <div
          key={index}
          className="flex items-center gap-3 text-gray-700 font-medium transition-all duration-500"
        >
          {announcements[index].icon}
          <span>{announcements[index].text}</span>
        </div>

      </div>
    </div>
  );
}