import { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Heart } from "lucide-react";

export default function Auth({ setCurrentPage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        await updateProfile(userCredential.user, {
          displayName: form.displayName,
        });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
      setCurrentPage("dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Heart className="icon-heart" />
          </div>
          <h1>MindfulCheck</h1>
          <p>Your daily mental health companion</p>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="auth-toggle-container">
          <button
            className="auth-toggle"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Need an account? Sign Up"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
