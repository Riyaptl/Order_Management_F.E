import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreas, setChoseArea } from "../slice/areaSlice";
import { logout } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarComponents";

export default function HomePage() {
  const dispatch = useDispatch();
  const { areas, loading, error, choseArea } = useSelector((state) => state.area);
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchAreas());   
  }, [dispatch]);

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (area) => {
    setSelectedArea(area.name);
    setSearchTerm(area.name); 
    dispatch(setChoseArea(area._id));
    setShowDropdown(false);  
    navigate('/shops')
  };
  
  const handleLogout = () => {
  dispatch(logout());
  navigate("/login");
};

  return (
    <div className="p-4">
    {role === "admin" && (
        <div className="flex justify-center mb-8">
          <Navbar />
        </div>
      )}
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
        Welcome to Dumyum Chocolates
      </h1>

      <div className="mb-4 relative">
        <label className="block mb-5 text-xl font-medium text-gray-700">
          Select Your Route
        </label>

        {loading ? (
          <p>Loading areas...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder={selectedArea ? selectedArea : "Search area..."}
              className="w-full border border-gray-300 p-3 rounded text-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            {showDropdown && (
              <ul className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded mt-1 shadow">
                {filteredAreas.length === 0 ? (
                  <li className="p-3 text-gray-500">No areas found</li>
                ) : (
                  filteredAreas.map((area) => (
                    <li
                      key={area._id}
                      onClick={() => handleSelect(area)}
                      className="p-3 hover:bg-amber-100 cursor-pointer"
                    >
                      {area.name}
                    </li>
                  ))
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  </div>
  );
}
