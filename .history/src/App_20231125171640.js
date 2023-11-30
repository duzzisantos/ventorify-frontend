import "./App.css";
import "bootstrap";
import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./auth/navbar";
import SideBar from "./components/sidebar";
import WareHouse from "./pages/warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import Shelf from "./pages/shelf";
import Sales from "./pages/sales";
import CreateRecord from "./pages/create";
import Profile from "./pages/profile";
import Messages from "./pages/messages";
import Purchase from "./pages/purchase";
import OperationLogs from "./pages/operations";
import ErrorBoundary from "./components/error-boundary";
import ApplicationSettings from "./pages/settings";
import Team from "./pages/team";
import Notifications from "./pages/message-notification";
import EmailPage from "./pages/email-page";
import Footer from "./components/footer";
import LandingPage from "./pages/LandingPage";
import PricesPage from "./pages/PricesPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import EmployeePerformance from "./pages/EmployeePerformance";

function App() {
  const [theme, setTheme] = useState(false);
  const ref = useRef();
  const documentRef = ref.current;
  const navbarRef = ref.current;
  const sidebarRef = ref.current;
  const footerRef = ref.current;
  const handleDarkMode = () => {
    setTheme(!theme);
  };

  return (
    <div className="col-lg-12 App">
      <Navigation
        onChange={handleDarkMode}
        ref={navbarRef}
        bg={theme ? "dark" : "light"}
      />

      <div
        ref={documentRef}
        className={`col-lg-12 ${
          theme ? "bg-black swap-color" : "bg-white"
        } h-100 d-flex flex-row major-wrapper pt-5`}
      >
        <SideBar
          className={`col-md-1 ${
            theme ? "bg-black" : "bg-white"
          } shadow-sm vh-100 mt-4 pt-5 rounded-0`}
          ref={sidebarRef}
          id={"side-bar"}
        />

        <main className="col-12">
          <ErrorBoundary>
            <Routes>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Navigation />} />
              <Route path="auth/landing-page" element={<LandingPage />} />
              <Route path="auth/warehouse" element={<WareHouse />} />
              <Route path="auth/shelf" element={<Shelf />} />
              <Route path="auth/sales" element={<Sales />} />
              <Route path="auth/create" element={<CreateRecord />} />
              <Route path="auth/profile" element={<Profile />} />
              <Route path="auth/messages" element={<Messages />} />
              <Route path="auth/purchase" element={<Purchase />} />
              <Route path="auth/settings" element={<ApplicationSettings />} />
              <Route path="auth/operations" element={<OperationLogs />} />
              <Route path="auth/team" element={<Team />} />
              <Route path="auth/prices" element={<PricesPage />} />
              <Route
                path="auth/employee-performance"
                element={<EmployeePerformance />}
              />
              <Route
                path="auth/message-notification/*"
                element={<Notifications />}
              />
              <Route
                path="auth/navbar/message-notification/email-details/:id"
                element={<EmailPage />}
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
      <Footer
        ref={footerRef}
        className={`w-100 ${
          theme ? "bg-dark" : "bg-light"
        } shadow-sm footer-font d-flex flex-row flex-wrap gap-3 py-3 justify-content-end text-secondary`}
      />
    </div>
  );
}

export default App;
