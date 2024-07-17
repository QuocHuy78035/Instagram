import axios from "../configs/axios.config";

export const createConversation = async (participants: Array<string>) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/conversation`,
      {
        participants,
      }
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getAllConversations = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/conversation`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getConversation = async (id: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/conversation/${id}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const deleteConversation = async (id: string) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/conversation/${id}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
