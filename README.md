Mental Health Check-in Web Application
Overview
This is a responsive web application designed to help users perform daily mental health check-ins. Built with React for the front-end and Firebase for authentication and data storage, it offers a secure and user-friendly experience. The application is deployed on Vercel.
Features

User authentication using Firebase Authentication.
Daily check-in form with sliders for mood, stress, energy, and sleep ratings (1-10).
Text fields for users to write about feelings, gratitude, and goals.
Responsive design across various screen sizes.
Data encryption for sensitive user entries stored in Firebase Firestore.

Prerequisites

Node.js (v14 or later)
npm or yarn
Firebase account for authentication and Firestore

Installation

Clone the repository:git clone https://github.com/nawaid2003/mental-health-checkin.git
cd mental-health-checkin

Install dependencies:npm install

Set up Firebase:
Create a Firebase project and enable Authentication and Firestore.
Update src/firebase/firebase.js with your Firebase config (e.g., API key, auth domain).

Start the application locally:npm start

Open http://localhost:3000 to view it in the browser.

Usage

Register or log in with your email and password.
Navigate to the Dashboard to view stats and recent check-ins.
Complete a daily check-in form to record your mental health data.

Deployment
The application is deployed on Vercel (update with your actual link). See deployment.md for details.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
License
MIT License - See LICENSE file for details.
Contact
For queries, contact nawaidwork@gmail.com.
