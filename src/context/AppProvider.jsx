import { AuthProvider } from "./AuthContext";
import { ReportProvider } from "./ReportContext";
import { AdminDataProvider } from "./AdminDataContext";


export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ReportProvider>
        <AdminDataProvider>
          {children}
        </AdminDataProvider>
      </ReportProvider>
    </AuthProvider>
  );
};
