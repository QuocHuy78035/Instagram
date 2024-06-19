import axios from "../configs/axios.config";

export const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/user/me");
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
