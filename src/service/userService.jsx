const API_BASE_URL = "http://localhost:5000/api";

export const fetchSRDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Auth token not found");

  const response = await fetch(`${API_BASE_URL}/user/srs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to fetch shops");
  }

  return await response.json();
};
