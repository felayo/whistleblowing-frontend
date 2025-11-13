import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, axiosPrivate } from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    loading: true,
  });

  // ✅ Try to refresh token on mount (silent login)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/auth/refresh", {
          withCredentials: true,
        });

        console.log("🔄 Silent login success:", response.data);

        const { token, user } = response.data;

        if (token && user) {
          // ✅ Save both user and token
          setAuth({
            user,
            accessToken: token,
            loading: false,
          });
        } else {
          setAuth({ user: null, accessToken: null, loading: false });
        }
      } catch (err) {
        console.error("❌ Silent login failed:", err);
        setAuth({ user: null, accessToken: null, loading: false });
      }
    };

    verifyUser();
  }, []);

  // ✅ Manual login
  const login = (userData, token) => {
    setAuth({
      user: userData,
      accessToken: token,
      loading: false,
    });
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axiosPrivate.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAuth({ user: null, accessToken: null, loading: false });
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
