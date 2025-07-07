import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";
import {
  Heart,
  Calendar,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Smile,
  AlertTriangle,
  Zap,
  Moon,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function Dashboard({ setCurrentPage }) {
  const [checkins, setCheckins] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [expandedCheckin, setExpandedCheckin] = useState(null);

  const decryptText = (encryptedText) => {
    if (!encryptedText) return "";
    try {
      const key = import.meta.env.VITE_ENCRYPTION_KEY;
      if (!key) {
        console.warn(
          "Encryption key is missing. Data will be displayed unencrypted."
        );
        return encryptedText;
      }
      const bytes = CryptoJS.AES.decrypt(encryptedText, key);
      return bytes.toString(CryptoJS.enc.Utf8) || "Unable to decrypt.";
    } catch (e) {
      console.error("Decryption error:", e);
      return "Unable to decrypt.";
    }
  };

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const q = query(
          collection(db, "checkins"),
          where("uid", "==", auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const fetchedCheckins = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          feelings: decryptText(doc.data().feelings),
          gratitude: decryptText(doc.data().gratitude),
          goals: decryptText(doc.data().goals),
        }));

        const sortedCheckins = fetchedCheckins.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.toDate() - a.createdAt.toDate();
        });

        setCheckins(sortedCheckins);
      } catch (e) {
        setError(`Failed to fetch check-ins: ${e.message}`);
      }
    };
    fetchCheckins();
  }, []);

  const getAverageScore = (field) => {
    if (checkins.length === 0) return "0.0";
    const sum = checkins.reduce(
      (acc, checkin) => acc + (checkin[field] || 0),
      0
    );
    return (sum / checkins.length).toFixed(1);
  };

  const getTodayCheckin = () => {
    const today = new Date().toDateString();
    return checkins.find((c) => c.createdAt?.toDate().toDateString() === today);
  };

  const todayCheckin = getTodayCheckin();

  const toggleExpand = (id) => {
    setExpandedCheckin(expandedCheckin === id ? null : id);
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <Heart className="icon-heart" />
            <h1>MindfulCheck</h1>
          </div>
          <div className="header-nav">
            <span>
              Welcome,{" "}
              {auth.currentUser?.displayName || auth.currentUser?.email}
            </span>
            <button onClick={() => auth.signOut()}>
              <LogOut className="icon" /> Sign Out
            </button>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="icon" />
            ) : (
              <Menu className="icon" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <span>
              Welcome,{" "}
              {auth.currentUser?.displayName || auth.currentUser?.email}
            </span>
            <button onClick={() => auth.signOut()}>
              <LogOut className="icon" /> Sign Out
            </button>
          </div>
        )}
      </header>
      <div className="dashboard-content">
        {error && (
          <div className="error-container">
            <p className="error">{error}</p>
          </div>
        )}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <p>Total Check-ins</p>
              <p className="stat-value">{checkins.length}</p>
            </div>
            <Calendar className="icon-blue" />
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <p>Avg Mood</p>
              <p className="stat-value green">{getAverageScore("mood")}</p>
            </div>
            <TrendingUp className="icon-green" />
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <p>Avg Stress</p>
              <p className="stat-value red">{getAverageScore("stress")}</p>
            </div>
            <TrendingUp className="icon-red" />
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <p>Avg Energy</p>
              <p className="stat-value orange">{getAverageScore("energy")}</p>
            </div>
            <TrendingUp className="icon-orange" />
          </div>
        </div>
        <div className="checkin-status">
          <h2>Today's Check-in</h2>
          {todayCheckin ? (
            <div
              className="status-card completed"
              style={{
                background: "linear-gradient(135deg, #e0e7ff, #dbeafe)",
              }}
            >
              <CheckCircle2 className="status-icon" />
              <div>
                <p className="status-message">
                  ✓ You've completed your check-in for today!
                </p>
                <div className="status-metrics">
                  <div className="metric">
                    <Smile className="metric-icon" /> Mood: {todayCheckin.mood}
                    /10
                  </div>
                  <div className="metric">
                    <AlertTriangle className="metric-icon" /> Stress:{" "}
                    {todayCheckin.stress}/10
                  </div>
                  <div className="metric">
                    <Zap className="metric-icon" /> Energy:{" "}
                    {todayCheckin.energy}/10
                  </div>
                  <div className="metric">
                    <Moon className="metric-icon" /> Sleep: {todayCheckin.sleep}
                    /10
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="status-card pending"
              style={{
                background: "linear-gradient(135deg, #fefce8, #fef08a)",
              }}
            >
              <p className="status-message">
                You haven't completed your check-in today.
              </p>
              <button
                className="complete-btn"
                onClick={() => setCurrentPage("checkin")}
              >
                Complete Check-in
              </button>
            </div>
          )}
        </div>
        <div className="recent-checkins">
          <h2>Recent Check-ins</h2>
          {checkins.length === 0 ? (
            <p className="no-checkins">
              No check-ins yet. Complete your first check-in to get started!
            </p>
          ) : (
            <div className="checkin-list">
              {checkins.slice(0, 5).map((checkin) => (
                <div key={checkin.id} className="checkin-item">
                  <div
                    className="checkin-header"
                    onClick={() => toggleExpand(checkin.id)}
                  >
                    <h3>{checkin.createdAt?.toDate().toLocaleDateString()}</h3>
                    <span>
                      {checkin.createdAt?.toDate().toLocaleTimeString()}
                    </span>
                    <ChevronDown
                      className={`expand-icon ${
                        expandedCheckin === checkin.id ? "rotated" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`checkin-details ${
                      expandedCheckin === checkin.id ? "expanded" : ""
                    }`}
                  >
                    <div className="checkin-grid">
                      <div className="metric">
                        <Smile className="metric-icon" /> Mood: {checkin.mood}
                        /10
                      </div>
                      <div className="metric">
                        <AlertTriangle className="metric-icon" /> Stress:{" "}
                        {checkin.stress}/10
                      </div>
                      <div className="metric">
                        <Zap className="metric-icon" /> Energy: {checkin.energy}
                        /10
                      </div>
                      <div className="metric">
                        <Moon className="metric-icon" /> Sleep: {checkin.sleep}
                        /10
                      </div>
                    </div>
                    {(checkin.feelings ||
                      checkin.gratitude ||
                      checkin.goals) && (
                      <div className="checkin-text">
                        {checkin.feelings && (
                          <p>
                            <span>Feelings:</span> {checkin.feelings}
                          </p>
                        )}
                        {checkin.gratitude && (
                          <p>
                            <span>Gratitude:</span> {checkin.gratitude}
                          </p>
                        )}
                        {checkin.goals && (
                          <p>
                            <span>Goals:</span> {checkin.goals}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
