import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageMessage from "./pages/PageMessage";
import { useAuthContext } from "./context/AuthContext";
import NoConversation from "./components/message/NoConversation";
import Conversation from "./components/message/Conversation";
import PageHome from "./pages/PageHome";
import PageExplore from "./pages/PageExplore";
import PageNotifications from "./pages/PageNotifications";
import PageCreate from "./pages/PageCreate";
import PageReels from "./pages/PageReels";
import PageSignUp from "./pages/PageSignUp";
import PageVerifyCode from "./pages/PageVerifyCode";
import PageForgotPassword from "./pages/PageForgotPassword";
import PageResetPassword from "./pages/PageResetPassword";
import { useEffect } from "react";
import useOpenNavigateMore from "./zustand/useOpenNavigateMore";
import PageProfile from "./pages/PageProfile";

export default function App() {
  const { user } = useAuthContext();
  const { setIsOpenNavigateMore } = useOpenNavigateMore();
  useEffect(() => {
    function handleClickOutside(event) {
      const navigateMore = document.getElementById("navigate__more");
      const btnMore = document.getElementsByClassName("btn__more");
      if (btnMore) {
        for (let i = 0; i < btnMore.length; i++) {
          if (
            btnMore[i] &&
            !btnMore[i].contains(event.target) &&
            navigateMore &&
            !navigateMore.contains(event.target)
          ) {
            setIsOpenNavigateMore(false);
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpenNavigateMore]);
  return user === "" ? (
    ""
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!user ? <PageLogin /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<PageSignUp />} />
          <Route path="/forgotPassword" element={<PageForgotPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={!user ? <PageResetPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/verifyCode"
            element={!user ? <PageVerifyCode /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <PageHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/explore"
            element={user ? <PageExplore /> : <Navigate to="/login" />}
          />
          <Route
            path="/reels"
            element={user ? <PageReels /> : <Navigate to="/login" />}
          />
          <Route path="/notifications" element={<PageNotifications />} />
          <Route
            path="/create"
            element={user ? <PageCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={user ? <PageProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/direct/inbox"
            element={
              user ? (
                <PageMessage>
                  <NoConversation />
                </PageMessage>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/direct/t/:id"
            element={
              user ? (
                <PageMessage>
                  <Conversation />
                </PageMessage>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
