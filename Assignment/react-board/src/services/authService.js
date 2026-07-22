import authClient from "../api/authClient.js";

export async function register({ username, password }) {
  await authClient.post("/auth/signup", { username, password, role: "ADMIN" });
}
export async function login({ username, password }) {
  const { data } = await authClient.post("/auth/login", { username, password });
  return {
    token: data.token,
    user: { username: data.username, name: data.username, roles: [data.role] },
  };
}
