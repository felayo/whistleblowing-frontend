import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "../components/Global/Navbar";
import CaseDetails from "../components/Reports/CaseDetails";
import Messages from "../components/Reports/Messages";

const ReportDetailsPage = () => {
  const { caseId } = useParams();
  // For now, using static data. Later, fetch case details using caseId
  const caseDetails = {
    "Case ID": "CMQH-O-1",
    "Date and time": "18 Sept 2025, 11:53:46",
    Subject: "Stolen manhole cover",
    Description: "This guy stole manhole cover along Awolowo way, Ikeja, kindly find the attached image for reference",
    Name: "-",
    Phone: "-",
    Email: "-",
    Status: "Open",
    Category: "Drainage",
    "Dept Handling Case": "LAWMA",
    "Case Location": "Ikeja",
  };
  return (
    <Container maxWidth="md">
      <Navbar />
      <CaseDetails details={caseDetails} />
      <Messages />
    </Container>
  );
};

export default ReportDetailsPage;
