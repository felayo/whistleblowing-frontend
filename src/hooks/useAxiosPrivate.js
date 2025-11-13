import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Add Authorization header before each request
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth?.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleanup interceptor when component unmounts or auth changes
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
