import Codes from "../data/codes.class";

const codes: Codes = {
  200: "Sign up successfully!",
  201: "Log in successfully!",
  202: "Reset password successfully!",
  203: "Create conversation successfully!",
  204: "Get conversation successfully!",
  205: "Get all conversations successfully!",
  206: "Delete conversation successfully!",
  207: "Send message successfully!",
  208: "AI answers message successfully!",
  209: "Find messages by conversation successfully!",
  210: "Delete message successfully!",
  211: "Find recent search by user successfully!",
  212: "Remove searched user from recent search successfully!",
  213: "Remove all searched users from recent search successfully!",
  214: "Add searched user to recent search successfully!",
  215: "Create story successfully!",
  216: "Find stories by user successfully!",
  217: "Update user viewed by id successfully!",
  218: "Delete story successfully!",
  219: "Get user successfully!",
  220: "Get user by username successfully!",
  221: "Following user successfully!",
  222: "Unfollowing user successfully!",
  223: "Turn on mode private successfully!",
  224: "Turn off mode private successfully!",
  225: "Find followings successfully!",
  226: "Find followings by user id and have stories successfully!",
  227: "Search users successfully!",
  228: "Update profile successfully!",
  229: "Update password successfully!",
};

export default function getMessage(textCode: number): string {
  if (!codes[textCode]) return "";
  return codes[textCode];
}
