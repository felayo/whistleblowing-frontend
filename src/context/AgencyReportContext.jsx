// src/context/AgencyReportContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AgencyReportContext = createContext();

export const AgencyReportProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken;
  const axiosPrivate = useAxiosPrivate();

  const [agencyReports, setAgencyReports] = useState([]);
  const [selectedAgencyReport, setSelectedAgencyReport] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState(null);

  // ===== FETCH ALL REPORTS FOR AGENCY =====
  const fetchReportsPerAgency = async (params = {}) => {
    if (auth?.user?.role !== "agency") return; // 🔥 role check

    setLoadingList(true);
    setError(null);

    try {
      const query = new URLSearchParams(params).toString();
      const { data } = await axiosPrivate.get(
        `/agency${query ? `?${query}` : ""}`
      );
      if (data?.success) {
        setAgencyReports(data.data || []);
      } else {
        setAgencyReports([]);
      }
    } catch (err) {
      console.error("❌ Error fetching agency reports:", err);
      setError(err.response?.data?.message || "Failed to fetch agency reports");
    } finally {
      setLoadingList(false);
    }
  };

  // ===== FETCH SINGLE REPORT BY ID FOR AGENCY =====
  const fetchReportByIdPerAgency = async (id) => {
    if (auth?.user?.role !== "agency") return null; 

    setLoadingReport(true);
    setError(null);

    try {
      const { data } = await axiosPrivate.get(`/agency/${id}`);
      if (data?.success) {
        setSelectedAgencyReport(data.data);
      } else {
        setSelectedAgencyReport(null);
      }
    } catch (err) {
      console.error("❌ Error fetching agency report details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch agency report details"
      );
    } finally {
      setLoadingReport(false);
    }
  };

  // ========== FETCH AGENCY USER'S INFO ==========
  const fetchUser = async (userId) => {
    if (!userId) return;
    setUser(null);
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPrivate.get(`/agency/users/${userId}`);
      if (res?.data?.success) setUser(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      setError(err.response?.data?.message || "Failed to load user");
    }finally {
      setLoading(false);
    }
  };

  // ========== UPDATE SELECTED REPORT COMMENTS ==========
  const updateSelectedReportComments = (newComments) => {
    setSelectedAgencyReport((prev) =>
      prev ? { ...prev, comments: newComments } : prev
    );
  };

  // ===== Optional: auto-fetch on mount (if desired) =====
  useEffect(() => {
    if (!token) return;

    fetchReportsPerAgency();
  }, [token]);

  return (
    <AgencyReportContext.Provider
      value={{
        agencyReports,
        selectedAgencyReport,
        user,
        loading,
        loadingList,
        loadingReport,
        error,
        fetchUser,
        fetchReportsPerAgency,
        fetchReportByIdPerAgency,
        updateSelectedReportComments,
      }}
    >
      {children}
    </AgencyReportContext.Provider>
  );
};

// Custom hook
export const useAgencyReport = () => useContext(AgencyReportContext);
