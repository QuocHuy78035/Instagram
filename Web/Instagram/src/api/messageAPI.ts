import axios from "../configs/axios.config";

export const createMessage = async (body: {
  conversation: string;
  message: string;
}) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v1/message", body);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
