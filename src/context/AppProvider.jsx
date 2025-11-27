import { AuthProvider, AuthContext } from "./AuthContext";
import { ReportProvider } from "./ReportContext";
import { AdminDataProvider } from "./AdminDataContext";
import { AgencyReportProvider } from "./AgencyReportContext";
import { useContext } from "react";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <RoleBasedProviders>{children}</RoleBasedProviders>
    </AuthProvider>
  );
};

const RoleBasedProviders = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const role = auth?.user?.role;

  // 🔄 Wait for auth to finish initializing
  if (loading) {
    return <div>Loading...</div>;
  }

  // 👤 No user (citizen/unlogged)
  if (!role) {
    return children;
  }

  // 🛠 ADMIN
  if (role === "admin") {
    return (
      <ReportProvider>
        <AdminDataProvider>{children}</AdminDataProvider>
      </ReportProvider>
    );
  }

  // 🏢 AGENCY
  if (role === "agency") {
    return (
      <AgencyReportProvider>
        {children}
      </AgencyReportProvider>
    );
  }

  return children;
};
