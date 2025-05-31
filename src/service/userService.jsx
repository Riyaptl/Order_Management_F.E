const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = `${baseURL}/api/user`;

export const fetchSRDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Auth token not found");

  const response = await fetch(`${API_BASE_URL}/srs`, {
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
