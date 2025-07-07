Deployment Process
Deployment Platform
The application is deployed on Vercel, a platform for static and serverless deployment, ideal for React applications with Firebase integration.
Steps

Prepare the Project:

Ensure all dependencies are listed in package.json.
Update src/firebase/firebase.js with your Firebase config.
Set up environment variables in a .env.local file (e.g., VITE_ENCRYPTION_KEY=your_key) for local testing.

Deploy to Vercel:

Install the Vercel CLI: npm install -g vercel.
Log in to Vercel: vercel login.
Deploy the project: vercel from the root directory.
Follow the CLI prompts to link to your GitHub repository and set environment variables (e.g., ENCRYPTION_KEY).
Vercel will provide a deployment URL (e.g., https://mental-health-checkin.vercel.app).

Configure Environment Variables:

In the Vercel Dashboard, go to your project settings and add:
ENCRYPTION_KEY: Your encryption key for CryptoJS.

Ensure the Firebase config is included in firebase.js (not as an env var for client-side use).

Domain and SSL:

Vercel provides a default domain and automatic SSL. Optionally, add a custom domain via the dashboard.

Deployed Application Link
https://mental-health-checkin.vercel.app (Update with your actual link after deployment.)
Local Testing Post-Deployment

Run npm start to test locally.
Verify data is saved to and retrieved from Firestore via the Firebase Console.
Test responsiveness and authentication flow.

Challenges

Environment Variables: Initial deployment failed due to missing ENCRYPTION_KEY; resolved by adding it in Vercel.
Firebase Integration: Ensuring real-time updates required adjusting Firestore listeners, though not fully implemented yet.
