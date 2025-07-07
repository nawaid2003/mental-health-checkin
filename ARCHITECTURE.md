Application Architecture
Overview
The Mental Health Check-in application is a single-page web application built with React, utilizing Firebase for authentication and Firestore for data storage. It is deployed on Vercel for scalability and ease of access.
Architecture Diagram
[Client (React)] <--> [Firebase Authentication] <--> [Firebase Firestore]
|
[Vercel Hosting]

Components
Front-end (React)

index.html: Entry point for the single-page application, served from the root.
App.jsx: Main component managing page navigation (Auth, Dashboard, CheckInForm).
Auth.jsx: Handles user login and signup using Firebase Authentication.
CheckInForm.jsx: Contains the daily check-in form with Slider components for ratings and text areas for notes.
Slider.jsx: Reusable slider component for rating inputs.
Dashboard.jsx: Displays user stats, today's check-in status, and recent check-ins.
styles/index.css: Global styles with responsive design.
firebase/firebase.js: Configuration for Firebase services (Authentication and Firestore).

Back-end (Firebase)

Authentication: Firebase Authentication manages user login and signup, providing secure token-based access.
Firestore: Stores encrypted check-in data with collections for each user, ensuring scalability and real-time updates.

Data Flow

Authentication: Users log in via Firebase, receiving a token stored in local storage.
Check-in Submission: Form data is encrypted client-side with CryptoJS, saved to Firestore via Firebase SDK.
Data Retrieval: The Dashboard fetches and decrypts data from Firestore, displaying it to the authenticated user.

Security

Authentication: Firebase Authentication with email/password.
Data Encryption: AES encryption for sensitive fields (feelings, gratitude, goals) using a custom key stored in environment variables.
Authorization: Firebase Security Rules ensure only authenticated users access their data.

Challenges

Firebase Rules: Configuring Firestore Security Rules to balance security and accessibility required multiple iterations.
Encryption Consistency: Ensuring decryption worked across sessions needed careful key management in environment variables.
Vercel Deployment: Initial build failures due to missing environment variables were resolved by configuring them in Vercel.
