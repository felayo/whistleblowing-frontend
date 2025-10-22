import axios from "./axios";

export const createReport = async (data) => {
  const res = await axios.post("/reports", data);
  return res.data;
};

export const getReportByPassword = async (password) => {
  const res = await axios.post("/reports/follow-up", { password });
  return res.data;
};
