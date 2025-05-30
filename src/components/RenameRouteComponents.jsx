// src/components/UpdateRouteComponent.jsx
import React, { useState, useEffect } from "react";

const RenameRouteComponent = ({ isOpen, onClose, onUpdate, initialName, initialRoutes }) => {
  const [name, setName] = useState(initialName);
  const [routesText, setRoutesText] = useState(initialRoutes.join(", ")); // comma separated string

  useEffect(() => {
    setName(initialName);
    setRoutesText(initialRoutes.join(", "));
  }, [initialName, initialRoutes]);

  if (!isOpen) return null;

  const handleUpdateClick = () => {
    const routesArray = routesText
      .split(",")
      .map(r => r.trim())
      .filter(r => r.length > 0); // clean up empty entries

    onUpdate(name, routesArray);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Route</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter new route name"
        />
        <textarea
          value={routesText}
          onChange={(e) => setRoutesText(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter areas separated by commas"
          rows={3}
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={handleUpdateClick}
            className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-500 transition"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameRouteComponent;
