import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CryptoJS from "crypto-js";
import Slider from "./Slider";

export default function CheckInForm({ setCurrentPage }) {
  const [form, setForm] = useState({
    mood: 5,
    stress: 5,
    energy: 5,
    sleep: 5,
    feelings: "",
    gratitude: "",
    goals: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const encryptText = (text) => {
    if (!text) return "";
    try {
      const key = import.meta.env.VITE_ENCRYPTION_KEY;
      if (!key) {
        console.warn(
          "Encryption key is missing. Data will be stored unencrypted."
        );
        return text;
      }
      return CryptoJS.AES.encrypt(text, key).toString();
    } catch (e) {
      console.error("Encryption error:", e);
      throw e;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      await addDoc(collection(db, "checkins"), {
        uid: auth.currentUser.uid,
        mood: form.mood,
        stress: form.stress,
        energy: form.energy,
        sleep: form.sleep,
        feelings: encryptText(form.feelings),
        gratitude: encryptText(form.gratitude),
        goals: encryptText(form.goals),
        createdAt: serverTimestamp(),
      });
      setSuccess("Check-in submitted successfully!");
      setForm({
        mood: 5,
        stress: 5,
        energy: 5,
        sleep: 5,
        feelings: "",
        gratitude: "",
        goals: "",
      });
      setTimeout(() => setCurrentPage("dashboard"), 1000);
    } catch (e) {
      setError(`Error submitting check-in: ${e.message}`);
      console.error("Check-in submission error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-container">
      <header className="header">
        <div className="header-content">
          <button
            className="back-btn"
            onClick={() => setCurrentPage("dashboard")}
          >
            ← Back to Dashboard
          </button>
          <h1>Daily Check-in</h1>
          <div></div>
        </div>
      </header>
      <div className="checkin-card">
        <form onSubmit={handleSubmit}>
          <h2>How are you feeling today?</h2>
          <div className="sliders">
            <Slider
              label="Overall Mood"
              value={form.mood}
              onChange={(e) =>
                setForm({ ...form, mood: Number(e.target.value) })
              }
              color="green"
            />
            <Slider
              label="Stress Level"
              value={form.stress}
              onChange={(e) =>
                setForm({ ...form, stress: Number(e.target.value) })
              }
              color="orange"
            />
            <Slider
              label="Energy Level"
              value={form.energy}
              onChange={(e) =>
                setForm({ ...form, energy: Number(e.target.value) })
              }
              color="peach"
            />
            <Slider
              label="Sleep Quality"
              value={form.sleep}
              onChange={(e) =>
                setForm({ ...form, sleep: Number(e.target.value) })
              }
              color="lavender"
            />
          </div>
          <div className="form-group">
            <label>How are you feeling? Share your thoughts...</label>
            <textarea
              value={form.feelings}
              onChange={(e) => setForm({ ...form, feelings: e.target.value })}
              rows="4"
              placeholder="Describe your current emotional state, any challenges you're facing, or anything on your mind..."
            />
          </div>
          <div className="form-group">
            <label>What are you grateful for today?</label>
            <textarea
              value={form.gratitude}
              onChange={(e) => setForm({ ...form, gratitude: e.target.value })}
              rows="3"
              placeholder="List three things you're grateful for today..."
            />
          </div>
          <div className="form-group">
            <label>What's your intention for today?</label>
            <textarea
              value={form.goals}
              onChange={(e) => setForm({ ...form, goals: e.target.value })}
              rows="3"
              placeholder="What do you want to focus on or achieve today?"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setCurrentPage("dashboard")}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Complete Check-in"}
            </button>
          </div>
          {success && (
            <div className="success-container">
              <p className="success">{success}</p>
            </div>
          )}
          {error && (
            <div className="error-container">
              <p className="error">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
