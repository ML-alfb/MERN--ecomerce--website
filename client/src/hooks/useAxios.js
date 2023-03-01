import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function useAxios() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req, res) => {
    const user = jwt_decode(auth?.accessToken);
    // console.log("laaaaaaaa", user);
    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    try {
      const response = await axios.get("/api/users/refresh", {
        withCredentials: true,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response?.data?.id,
          accessToken: response?.data?.accessToken,
        })
      );
      setAuth(response?.data);
      req.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
      return req;
    } catch (error) {
      localStorage.clear(user);
      setAuth(false);
      navigate("/login");
    }
  });

  return axiosInstance;
}

export default useAxios;
