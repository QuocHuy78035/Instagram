import axios from "../configs/axios.config";

export const LoginAPI = async (body: {
  mobile?: string;
  email?: string;
  username?: string;
  password: string;
}) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v1/login", body);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
