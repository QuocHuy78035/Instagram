import axios from "../configs/axios.config";

export const createConversation = async (participants: Array<string>) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v1/conversation", {
      participants,
    });
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getAllConversations = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/conversation");
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getConversation = async (id: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/conversation/${id}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
