import "./App.css";
import "bootstrap";
import React, { useEffect, useState } from "react";
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
// import Notifications from "./pages/MessageNotification";
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
  const [user] = useAuthState(auth);
  const { pathname } = window.location;
  const [showSideBar, setShowSidebar] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    user && user.getIdToken().then((token) => setAccessToken(token));
  }, [user]);

  return (
    <div className="col-lg-12 App">
      {user && <Navigation />}
      <div
        className={`col-lg-12 h-100 d-flex flex-lg-row justify-content-center major-wrapper pt-5`}
      >
        {user && (
          <SideBar
            showSideBar={showSideBar}
            setShowSidebar={setShowSidebar}
            accessToken={accessToken}
          />
        )}

        <main className="col-12 col-sm-10">
          <ErrorBoundary>
            <Routes>
              {!user && pathname === "/login" ? (
                <Route path="/login" element={<Login />} />
              ) : !user && pathname === "/signup" ? (
                <Route path="/signup" element={<Signup />} />
              ) : !user && pathname === "/" ? (
                <Route path="/" element={<LandingPage />} />
              ) : (!user && pathname !== "/signup") ||
                (!user && pathname !== "/login") ? (
                <Route path="*" element={<NotFound404 user={user} />} />
              ) : (
                user && (
                  <>
                    <Route path="*" element={<NotFound404 user={user} />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="home" element={<LandingPage />} />
                    <Route
                      path="warehouse"
                      element={<WareHouse accessToken={accessToken} />}
                    />
                    <Route
                      path="shelf"
                      element={<Shelf accessToken={accessToken} />}
                    />
                    <Route
                      path="sales"
                      element={<Sales accessToken={accessToken} />}
                    />
                    <Route
                      path="create"
                      element={<CreateRecord accessToken={accessToken} />}
                    />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="messages"
                      element={<Messages accessToken={accessToken} />}
                    />
                    <Route path="purchase" element={<Purchase />} />
                    <Route path="settings" element={<ApplicationSettings />} />
                    <Route
                      path="operations"
                      element={<OperationLogs accessToken={accessToken} />}
                    />
                    <Route
                      path="team"
                      element={<Team accessToken={accessToken} />}
                    />
                    <Route
                      path="prices"
                      element={<PricesPage accessToken={accessToken} />}
                    />
                    <Route
                      path="orders"
                      element={<Orders accessToken={accessToken} />}
                    />
                    <Route
                      path="employee-performance"
                      element={
                        <EmployeePerformance accessToken={accessToken} />
                      }
                    />
                    {/* <Route
                      path="message-notification/*"
                      element={<Notifications accessToken={accessToken} />}
                    /> */}
                    <Route
                      path="message-notification/email-details/:id"
                      element={<EmailPage accessToken={accessToken} />}
                    />
                  </>
                )
              )}
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      {user && <Footer />}
    </div>
  );
}

export default App;
