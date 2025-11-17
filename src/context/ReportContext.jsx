import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken;
  const axiosPrivate = useAxiosPrivate();
  const [reports, setReports] = useState([]);
  const [reportCount, setReportCount] = useState(0);
  const [unassignedReports, setUnassignedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  // loading state were separated because of the 60-second poll set for unassigned report which also cause other reports to re-render
  const [loadingList, setLoadingList] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalReports: 0,
  });

  // ========== FETCH ALL REPORTS ==========
  const fetchAllReports = async (params = {}) => {
    if (!token) return; // ✅ avoid unauthorized request
    setLoadingList(true);
    setError(null);

    try {
      const query = new URLSearchParams(params).toString();
      const { data } = await axiosPrivate.get(
        `/admin/reports${query ? `?${query}` : ""}`
      );
      if (data?.success) {
        setReports(data.data || []);
        setPagination({
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
          totalReports: data.totalReports || 0,
        });
        setReportCount(data.totalReports || 0);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("❌ Error fetching all reports:", err);
      setError(err.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoadingList(false);
    }
  };

  // ========== FETCH UNASSIGNED REPORTS ==========
  const fetchUnassignedReports = async () => {
    if (!token) return; // ✅ avoid unauthorized request
    setLoadingList(true);
    setError(null);

    try {
      const { data } = await axiosPrivate.get("/admin/reports/unassigned");

      if (data?.success) {
        setUnassignedReports(data.data || []);
      } else {
        setUnassignedReports([]);
      }
    } catch (err) {
      console.error("❌ Error fetching unassigned reports:", err);
      setError(
        err.response?.data?.message || "Failed to fetch unassigned reports"
      );
    } finally {
      setLoadingList(false);
    }
  };

  // ========== FETCH SINGLE REPORT BY ID ==========
  const fetchReportById = async (id) => {
    if (!id) return;
    setLoadingReport(true);
    setError(null);

    try {
      const { data } = await axiosPrivate.get(`/admin/reports/${id}`);
      if (data?.success) {
        setSelectedReport(data.data);
      } else {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("❌ Error fetching report details:", err);
      setError(err.response?.data?.message || "Failed to fetch report details");
    } finally {
      setLoadingReport(false);
    }
  };

  // ========== UPDATE SELECTED REPORT COMMENTS ==========
  const updateSelectedReportComments = (newComments) => {
    setSelectedReport((prev) =>
      prev ? { ...prev, comments: newComments } : prev
    );
  };

  // ✅ Wait for token before fetching
  useEffect(() => {
    if (!token) return;

    // Initial fetch
    fetchAllReports();
    fetchUnassignedReports();

    // Poll every 60 seconds for unassigned reports
    const interval = setInterval(() => {
      fetchUnassignedReports(); // Only refetch unassigned
    }, 60_000);

    return () => clearInterval(interval); // Cleanup
  }, [token]);

  return (
    <ReportContext.Provider
      value={{
        reports,
        reportCount,
        unassignedReports,
        selectedReport,
        pagination,
        loadingList,
        loadingReport,
        loading: loadingList || loadingReport,
        error,
        fetchAllReports,
        fetchUnassignedReports,
        fetchReportById,
        updateSelectedReportComments,
      }}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook for convenience
export const useReport = () => useContext(ReportContext);
