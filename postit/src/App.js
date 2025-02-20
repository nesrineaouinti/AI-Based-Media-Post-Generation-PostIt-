import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import theme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layouts/Navbar";
import { AuthProvider } from "./context/AuthContext";
import PostGenerator from "./pages/PostGenerator";
import ProtectedRoute from "./context/ProtectedRoute";
import { ApiProvider } from "./context/ApiContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/post-generator"
              element={
                <ProtectedRoute>
                  <ApiProvider>
                    <PostGenerator />
                  </ApiProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
