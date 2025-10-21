import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Global/Navbar";
import ReportSubmitted from "../components/Reports/ReportSubmitted";

const ReportSubmittedPage = () => {
  const location = useLocation();
  const { caseId, password } = location.state || {};

  // If user navigates here directly without state, redirect home
  if (!caseId || !password) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="md">
      <Navbar />
      <ReportSubmitted caseId={caseId} password={password} />
    </Container>
  );
};

export default ReportSubmittedPage;
