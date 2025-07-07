import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import CheckInForm from "./components/CheckInForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentPage(user ? "dashboard" : "login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (currentPage === "login") {
    return <Auth setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "checkin") {
    return <CheckInForm setCurrentPage={setCurrentPage} />;
  }

  return null;
}
