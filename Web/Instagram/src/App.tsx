import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageMessage from "./pages/PageMessage";
import { useAuthContext } from "./context/AuthContext";
import NoConversation from "./components/message/NoConversation";
import Conversation from "./components/message/Conversation";

export default function App() {
  const { userId } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!userId ? <PageLogin /> : <Navigate to="/direct/inbox" />}
          />
          <Route
            path="/direct/inbox"
            element={
              userId ? (
                <PageMessage>
                  <NoConversation />
                </PageMessage>
              ) : (
                <Navigate to="/" />
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
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
