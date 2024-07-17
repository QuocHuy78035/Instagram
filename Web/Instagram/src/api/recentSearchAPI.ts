import axios from "../configs/axios.config";

export const findRecentSearchByUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/recentsearch`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const removeSearchedUserFromRecentSearch = async (
  searchUser: string
) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/recentsearch/${searchUser}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const addSearchedUserToRecentSearch = async (searchUser: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/recentsearch/${searchUser}`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const removeAllSearchedUsersFromRecentSearch = async () => {
  try {
    const res = await axios.patch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/recentsearch`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
