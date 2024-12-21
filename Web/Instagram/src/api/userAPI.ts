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

export const updateProfile = async (body: {
  file?: File;
  username?: string;
  name?: string;
  gender?: string;
  show_account_suggestions?: string;
  bio?: string;
}) => {
  try {
    const formData = new FormData();
    if (body.file) formData.append("file", body.file);
    if (body.username) formData.append("username", body.username);
    if (body.name) formData.append("name", body.name);
    if (body.gender) formData.append("gender", body.gender);
    if (body.show_account_suggestions)
      formData.append(
        "show_account_suggestions",
        body.show_account_suggestions
      );
    if (body.bio) formData.append("bio", body.bio);
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/me`,
      formData
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const getSuggestedUsers = async (limit?: number) => {
  try {
    let res;
    if (limit) {
      res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_DOMAIN
        }/api/v1/user/suggests?limit=${limit}`
      );
    } else {
      res = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/suggests`
      );
    }
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const followingUser = async (userId: string) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/following/${userId}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const unfollowingUser = async (userId: string) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/unfollowing/${userId}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
