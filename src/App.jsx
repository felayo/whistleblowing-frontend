import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import CreateReport from "./pages/ReportForm";
import ReportSubmitted from "./pages/ReportSubmitted";
import ReportDetails from "./pages/ReportDetails";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Auth/Unauthorized";

// Admin pages
import Dashboard from "./pages/Admin/AdminDashboard";
import AdminCasesPage from "./pages/Admin/AdminCasesPage";
import AdminAnalyticsPage from "./pages/Admin/AdminAnalyticsPage";
import AdminAgencyPage from "./pages/Admin/AdminAgencyPage";
import Categories from "./pages/Admin/AdminCategoriesPage";
import Users from "./pages/Admin/AdminUsersPage";
import AdminCaseDetailsPage from "./pages/Admin/AdminCaseDetailsPage";
import AdminUserDetailsPage from "./pages/Admin/AdminUserDetailsPage";
import AdminAgencyUsersDetail from "./pages/Admin/AdminAgencyUsersDetail";

// Agency Dashboard page
import AgencyDashboard from "./pages/Admin/AgencyDashboard";
import AgencyCasesPage from "./pages/Admin/AgencyCasesPage";
import AgencyAnalyticsPage from "./pages/Admin/AgencyAnalyticsPage";
import AgencySettingsPage from "./pages/Admin/AgencySettingsPage";
import AgencyCaseDetailsPage from "./pages/Admin/AgencyCaseDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/create-report" element={<CreateReport />} />
      <Route path="/follow-up/:password" element={<ReportDetails />} />
      <Route path="/report-submitted" element={<ReportSubmitted />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/cases" element={<AdminCasesPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/admin/agency" element={<AdminAgencyPage />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/agencies/:agencyId/users" element={<AdminAgencyUsersDetail />} />
        <Route path="/admin/cases/:caseId" element={<AdminCaseDetailsPage />} />
        <Route path="/admin/users/:userId" element={<AdminUserDetailsPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["agency"]} />}>
        <Route path="/agency/dashboard" element={<AgencyDashboard />} />
        <Route path="/agency/cases" element={<AgencyCasesPage />} />
        <Route path="/agency/analytics" element={<AgencyAnalyticsPage />} />
        <Route path="/agency/settings/:userId" element={<AgencySettingsPage />} />
        <Route path="/agency/cases/:caseId" element={<AgencyCaseDetailsPage />} />
      </Route>
      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
