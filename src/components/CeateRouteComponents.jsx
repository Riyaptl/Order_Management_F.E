import React, { useState } from "react";
import { X } from "lucide-react"; // optional, or replace with "×"

const CreateRouteComponents = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [routes, setRoutes] = useState([]);

  const handleAddRoute = () => {
    const trimmed = input.trim();
    if (trimmed && !routes.includes(trimmed)) {
      setRoutes([...routes, trimmed]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRoute();
    }
  };

  const handleRemoveRoute = (routeToRemove) => {
    setRoutes(routes.filter(route => route !== routeToRemove));
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), routes });
    setName("");
    setRoutes([]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Route</h2>

        {/* Route Group Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter route name"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        {/* Route Entry Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type areas to include and press Enter"
          className="w-full border rounded px-3 py-2 mb-2"
        />

        {/* Display added routes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {route}
              <button onClick={() => handleRemoveRoute(route)} className="text-red-500">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCreate}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            Create
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

export default CreateRouteComponents;
