import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageMessage from "./pages/PageMessage";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { userId } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route
            path="/direct/inbox"
            element={userId ? <PageMessage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
