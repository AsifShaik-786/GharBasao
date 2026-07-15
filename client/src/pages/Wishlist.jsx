import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingItem from "../components/ListingItem";

export default function Wishlist() {
  const { currentUser } = useSelector((state) => state.user);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
       const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/user/wishlist/${currentUser._id}`,
  {
    credentials: "include",
  }
);

const data = await res.json();

        if (res.ok) {
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchWishlist();
    }
  }, [currentUser]);

  return (
    <div className="max-w-6xl mx-auto p-3">
      <h1 className="text-3xl font-semibold mb-6">
        My Wishlist
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No wishlist items found.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {listings.map((listing) => (
            <ListingItem
              key={listing._id}
              listing={listing}
            />
          ))}
        </div>
      )}
    </div>
  );
}