const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = async (endpoint, method = "GET", data = null) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  const resData = await res.json();
  if (!res.ok) throw resData;
  return resData;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/user/loginUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw data;


  return data;
};