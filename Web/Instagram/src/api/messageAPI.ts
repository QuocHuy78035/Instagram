import axios from "../configs/axios.config";

export const createMessage = async (body: {
  conversation: string;
  message?: string;
  file?: File;
  replyMessage?: string;
  react?: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("conversation", body.conversation);
    if (body.message) formData.append("message", body.message);
    if (body.file) formData.append("file", body.file);
    if (body.replyMessage) formData.append("replyMessage", body.replyMessage);
    if (body.react) formData.append("react", body.react);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/message`,
      formData
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const answerMessageByAI = async (body: {
  conversation: string;
  message: string;
}) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/message/chatai`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const findByConversation = async (
  conversation: string,
  page: number
) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/message?conversation=${conversation}&page=${page}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/message/${messageId}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
