import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AuthContext } from "./AuthContext";

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken;
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== FETCH ALL CATEGORIES ==========
  const fetchCategories = async () => {
    try {
      const res = await axiosPrivate.get("/admin/categories");
      if (res.data) setCategories(res.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      setError("Failed to load categories");
    }
  };

  // ========== FETCH ALL AGENCIES ==========
  const fetchAgencies = async () => {
    try {
      const res = await axiosPrivate.get("/admin/agencies");
      if (res.data) setAgencies(res.data);
    } catch (err) {
      console.error("❌ Error fetching agencies:", err);
      setError("Failed to load agencies");
    }
  };

  // ========== FETCH ALL USERS ==========
  const fetchUsers = async () => {
    try {
      const res = await axiosPrivate.get("/admin/users");
      if (res.data?.success) setUsers(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError("Failed to load users");
    }
  };

  // ========== FETCH SINGLE USER ==========
  const fetchUser = async (userId) => {
    if (!userId) return;
    setSingleUser(null);
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPrivate.get(`/admin/users/${userId}`);
      if (res?.data?.success) setSingleUser(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      setError(err.response?.data?.message || "Failed to load user");
    }finally {
      setLoading(false);
    }
  };

  // ========== FETCH WHEN TOKEN IS READY ==========
  useEffect(() => {
    if (token) {
      const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
          await Promise.all([
            fetchCategories(),
            fetchAgencies(),
            fetchUsers(),
          ]);
        } catch (err) {
          setError("Failed to load admin data");
        } finally {
          setLoading(false);
        }
      };
      fetchAll();
    }
  }, [token]);

  return (
    <AdminDataContext.Provider
      value={{
        categories,
        agencies,
        users,
        singleUser,
        loading,
        error,
        refreshCategories: fetchCategories,
        refreshAgencies: fetchAgencies,
        refreshUsers: fetchUsers,
        fetchUser,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminDataContext);
