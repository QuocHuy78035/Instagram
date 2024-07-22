export default interface User {
  _id: string;
  email?: string;
  mobile?: string;
  username: string;
  name: string;
  bio: string;
  show_account_suggestions: boolean;
  gender: string;
  avatar: string;
  role: string;
}
