import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageMessage from "./pages/PageMessage";
import { useAuthContext } from "./context/AuthContext";
import NoConversation from "./components/message/NoConversation";
import Conversation from "./components/message/Conversation";
import PageHome from "./pages/PageHome";
import PageSearch from "./pages/PageSearch";
import PageExplore from "./pages/PageExplore";
import PageNotifications from "./pages/PageNotifications";
import PageCreate from "./pages/PageCreate";
import PageReels from "./pages/PageReels";
import PageSignUp from "./pages/PageSignUp";
import PageVerifyCode from "./pages/PageVerifyCode";
import PageForgotPassword from "./pages/PageForgotPassword";
import PageResetPassword from "./pages/PageResetPassword";

export default function App() {
  const { userId } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!userId ? <PageLogin /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<PageSignUp />} />
          <Route path="/forgotPassword" element={<PageForgotPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={!userId ? <PageResetPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/verifyCode"
            element={!userId ? <PageVerifyCode /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={userId ? <PageHome /> : <Navigate to="/login" />}
          />
          <Route path="/search" element={<PageSearch />} />
          <Route path="/explore" element={<PageExplore />} />
          <Route path="/reels" element={<PageReels />} />
          <Route path="/notifications" element={<PageNotifications />} />
          <Route
            path="/create"
            element={userId ? <PageCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/direct/inbox"
            element={
              userId ? (
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
              userId ? (
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
