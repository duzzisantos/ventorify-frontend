import "./App.css";
import "bootstrap";
import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import Navigation from "./auth/Navbar";
import SideBar from "./components/Sidebar";
import WareHouse from "./pages/Warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import Shelf from "./pages/Shelf";
import Sales from "./pages/Sales";
import CreateRecord from "./pages/Create";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Purchase from "./pages/Purchase";
import OperationLogs from "./pages/Operations";
import ErrorBoundary from "./components/ErrorBoundary";
import ApplicationSettings from "./pages/Settings";
import Team from "./pages/Team";
import Notifications from "./pages/MessageNotification";
import EmailPage from "./pages/EmailPage";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import PricesPage from "./pages/PricesPage";
import Login from "./auth/Login";
import EmployeePerformance from "./pages/EmployeePerformance";
import Signup from "./auth/Signup";
import Orders from "./pages/Orders";
import NotFound404 from "./pages/404";

function App() {
  const [theme, setTheme] = useState(false);
  const [user] = useAuthState(auth);
  const { pathname } = window.location;

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
      {user && (
        <Navigation
          onChange={handleDarkMode}
          ref={navbarRef}
          bg={theme ? "dark" : "light"}
        />
      )}

      <div
        ref={documentRef}
        className={`col-lg-12 ${
          theme ? "bg-black swap-color" : "bg-white"
        } h-100 d-flex flex-row major-wrapper pt-5`}
      >
        {user && (
          <SideBar
            className={`col-md-1 ${
              theme ? "bg-black" : "bg-white"
            } shadow-sm vh-100 mt-4 pt-5 rounded-0`}
            ref={sidebarRef}
            id={"side-bar"}
          />
        )}

        <main className="col-12">
          <ErrorBoundary>
            <Routes>
              {!user && pathname === "/login" ? (
                <Route path="/login" element={<Login />} />
              ) : !user && pathname === "/signup" ? (
                <Route path="/signup" element={<Signup />} />
              ) : !user && pathname === "/" ? (
                <Route path="/" element={<LandingPage />} />
              ) : !user || !pathname === "/signup" || !pathname === "/login" ? (
                <Route path="*" element={<NotFound404 />} />
              ) : (
                user && (
                  <>
                    <Route path="*" element={<NotFound404 />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="home" element={<LandingPage />} />
                    <Route path="warehouse" element={<WareHouse />} />
                    <Route path="shelf" element={<Shelf />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="create" element={<CreateRecord />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="purchase" element={<Purchase />} />
                    <Route path="settings" element={<ApplicationSettings />} />
                    <Route path="operations" element={<OperationLogs />} />
                    <Route path="team" element={<Team />} />
                    <Route path="prices" element={<PricesPage />} />
                    <Route path="orders" element={<Orders />} />
                    <Route
                      path="employee-performance"
                      element={<EmployeePerformance />}
                    />
                    <Route
                      path="message-notification/*"
                      element={<Notifications />}
                    />
                    <Route
                      path="navbar/message-notification/email-details/:id"
                      element={<EmailPage />}
                    />
                  </>
                )
              )}
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      {user && (
        <Footer
          ref={footerRef}
          className={`w-100 ${
            theme ? "bg-dark" : "bg-light"
          } shadow-sm footer-font d-flex flex-row flex-wrap gap-3 py-3 justify-content-end text-secondary`}
        />
      )}
    </div>
  );
}

export default App;
