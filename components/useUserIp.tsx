import { useEffect, useState } from "react";
import axios from "axios";
export const useUserIp = () => {
  const [ip, setUserIp] = useState<string>("");
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setUserIp(res.data.IPv4)
  }
  useEffect(() => {
    getData()
  }, []);

  return ip;
};