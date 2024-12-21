import Codes from "../data/codes.class";

const codes: Codes = {
  101: "User not found!",
  102: "Invalid followed user id!",
  103: "Followed user not found!",
  104: "Following users not found!",
  105: "No results found!",
  106: "Invalid user id!",
  107: "Current password is not correct! Please try again!",
  108: "Current password and new password must not be the same! Please try again!",
  109: "New password and retype new password must be the same! Please try again!",
  110: "Not found keystore!",
  111: "File not found!",
  112: "Other user not found!",
  113: "Invalid story id!",
  114: "Story not found!",
  115: "You are not the owner of this story!",
  116: "Invalid searched user id",
  117: "Searched user not found!",
  118: "Message and image must not be empty!",
  119: "Message and image can not be created at the same time!",
  120: "Invalid conversation id!",
  121: "Invalid reply message!",
  122: "Reply message not found!",
  123: "Conversation not found!",
  124: "Conversation is not for chatting with AI!",
  125: "Invalid message id!",
  126: "Message not found!",
  127: "Please add at least 1 participants!",
  128: "Keytoken error!",
  129: "Please just fill mobile phone or email!",
  130: "Can not fill both mobile phone and email",
  131: "Mobile existed!",
  132: "Email existed!",
  133: "Username existed!",
  134: "There was an error sending the email. Try again later!",
  135: "There was an error sending the SMS. Try again later!",
  136: "Please fill mobile phone, email or username!",
  137: "Mobile does not exist or is unverified!",
  138: "Email does not exist or is unverified!",
  139: "Username does not exist or is unverified!",
  140: "Mobile not found!",
  141: "Email not found!",
  142: "OTP has expired! Please send code again!",
  143: "Your entered OTP is invalid! Please try again!",
  144: "Please just fill mobile phone, email or username!",
  145: "Username or password does not exist!",
  146: "Email or password does not exist!",
  147: "Mobile or password does not exist!",
  148: "Your token is invalid or has expired!",
  149: "Passwords does not match!",
  150: "Please fill the conversation query!",
  151: "Please fill the page query!",
  152: "Invalid page query!",
  153: "Please fill the userId query!",
  154: "Limit must be greater than 0!",
  155: "Limit must be a number!",
};

export default function getMessageError(textCode: number): string {
  if (!codes[textCode]) return "";
  return codes[textCode];
}
