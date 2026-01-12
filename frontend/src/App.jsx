import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Layout } from "./components/Layout/Layout";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SoundsPage } from "./pages/SoundsPage";
import { BoardsPage } from "./pages/BoardsPage";
import { BoardDetailPage } from "./pages/BoardDetailsPage";
import "../src/styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/sounds" replace />} />
            <Route path="sounds" element={<SoundsPage />} />
            <Route path="boards" element={<BoardsPage />} />
            <Route path="boards/:id" element={<BoardDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
