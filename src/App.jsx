import React, { useState } from "react";
import MainTable from "./Components/MainTable";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/main" />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/main" element={<MainTable />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
