const API_URL =
  "http://localhost:5000/api";

async function request(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem(
      "cybernerb_token"
    );

  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,

        headers: {
          "Content-Type":
            "application/json",

          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),

          ...options.headers,
        },
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Request failed."
    );
  }

  return data;
}

export const api = {
  register(data) {
    return request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  login(data) {
    return request(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  getMissions() {
    return request(
      "/missions"
    );
  },

  getMission(id) {
    return request(
      `/missions/${id}`
    );
  },

  submitMission(data) {
    return request(
      "/results",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  getProfile() {
    return request(
      "/users/profile"
    );
  },
};