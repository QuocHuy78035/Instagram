import axios from "../configs/axios.config";

export const getUser = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/me`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getProfile = async (username: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/profile/${username}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const searchUser = async (search: string) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_SERVER_DOMAIN
      }/api/v1/user/search?search=${search}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
