import {
  createContext,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "cybernerb_user"
        );

      return saved
        ? JSON.parse(saved)
        : null;
    });

  const login = async (
    email,
    password
  ) => {
    const data =
      await api.login({
        email,
        password,
      });

    localStorage.setItem(
      "cybernerb_token",
      data.token
    );

    localStorage.setItem(
      "cybernerb_user",
      JSON.stringify(
        data.user
      )
    );

    setUser(data.user);

    return data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const data =
      await api.register({
        name,
        email,
        password,
      });

    localStorage.setItem(
      "cybernerb_token",
      data.token
    );

    localStorage.setItem(
      "cybernerb_user",
      JSON.stringify(
        data.user
      )
    );

    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      "cybernerb_token"
    );

    localStorage.removeItem(
      "cybernerb_user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated:
          Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}