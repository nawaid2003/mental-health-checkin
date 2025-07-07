# 🧠 Mental Health Check-in Web Application

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Firebase-9.0.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

<div align="center">
  <h3>🌟 A secure, responsive web application for daily mental health tracking and self-reflection</h3>
  <p>
    <a href="https://mental-health-checkin.vercel.app" target="_blank">🚀 Live Demo</a> •
    <a href="#features">✨ Features</a> •
    <a href="#installation">💻 Installation</a> •
    <a href="#usage">📖 Usage</a>
  </p>
</div>

---

## 🎯 Overview

The Mental Health Check-in application is a modern, single-page web application designed to help users maintain their mental wellness through daily self-assessments. Built with React and powered by Firebase, it provides a secure, encrypted environment for users to track their emotional well-being, set goals, and practice gratitude.

## ✨ Features

### 🔐 **Secure Authentication**

- Email/password authentication via Firebase
- Secure token-based access control
- Protected user data and privacy

### 📊 **Daily Check-ins**

- Interactive sliders for mood, stress, energy, and sleep ratings (1-10)
- Reflective text fields for feelings, gratitude, and personal goals
- Real-time data validation and submission

### 📱 **Responsive Design**

- Mobile-first approach with adaptive layouts
- Cross-device compatibility (desktop, tablet, mobile)
- Modern, intuitive user interface

### 🔒 **Data Security**

- Client-side AES encryption for sensitive data
- Firebase Security Rules for data protection
- Environment-based encryption key management

### 📈 **Personal Dashboard**

- Overview of daily check-in statistics
- Recent check-in history and trends
- User-friendly data visualization

## 🛠️ Tech Stack

| Technology    | Purpose                     | Version |
| ------------- | --------------------------- | ------- |
| **React**     | Frontend Framework          | 18.2.0  |
| **Firebase**  | Authentication & Database   | 9.0.0   |
| **Firestore** | NoSQL Database              | Latest  |
| **CryptoJS**  | Data Encryption             | Latest  |
| **Vercel**    | Deployment Platform         | Latest  |
| **CSS3**      | Styling & Responsive Design | Latest  |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Firebase account** - [Create account](https://firebase.google.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nawaid2003/mental-health-checkin.git
   cd mental-health-checkin
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**

   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Configure Firebase**

   ```javascript
   // Update src/firebase/firebase.js with your config
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     // ... other config
   };
   ```

5. **Set up environment variables**

   ```bash
   # Create .env.local file
   echo "VITE_ENCRYPTION_KEY=your-secret-encryption-key" > .env.local
   ```

6. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### 🔑 **Getting Started**

1. **Register** a new account or **log in** with existing credentials
2. Navigate to the **Dashboard** to view your stats and check-in history
3. Complete your **daily check-in** to record your mental health data

### 📝 **Daily Check-in Process**

1. **Rate your day** using interactive sliders:

   - 😊 Mood (1-10)
   - 😰 Stress Level (1-10)
   - ⚡ Energy Level (1-10)
   - 😴 Sleep Quality (1-10)

2. **Reflect and write** about:

   - How you're feeling today
   - What you're grateful for
   - Your goals and intentions

3. **Submit** your check-in to save encrypted data to your personal profile

### 📊 **Dashboard Features**

- View today's check-in status
- Browse recent check-in history
- Monitor personal wellness trends

## 🏗️ Architecture

For detailed technical architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🚢 Deployment

The application is deployed on **Vercel** with automatic SSL and global CDN. For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Live Application**: [https://mental-health-checkin.vercel.app](https://mental-health-checkin.vercel.app)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 🐛 **Bug Reports**

If you find a bug, please create an issue with:

- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### 💡 **Feature Requests**

We're always open to new ideas! Please create an issue with:

- Feature description
- Use case explanation
- Mockups or examples (if available)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 📞 Contact & Support

- **Email**: [nawaidwork@gmail.com](mailto:nawaidwork@gmail.com)
- **GitHub**: [@nawaid2003](https://github.com/nawaid2003)
- **Issues**: [GitHub Issues](https://github.com/nawaid2003/mental-health-checkin/issues)

---

<div align="center">
  <p>Made with ❤️ for mental health awareness</p>
  <p>If this project helped you, please consider giving it a ⭐</p>
</div>

## 🗺️ Roadmap

- [ ] Data export functionality
- [ ] Advanced analytics and insights
- [ ] Mood tracking trends and patterns
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Social features (optional sharing)

---

_Remember: This tool is for personal wellness tracking and is not a substitute for professional mental health care. If you're experiencing serious mental health concerns, please consult with a qualified healthcare professional._
