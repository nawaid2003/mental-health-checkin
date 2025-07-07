# 🚀 Deployment Guide

<div align="center">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Firebase-Configured-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/SSL-Secured-green?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="SSL">
</div>

## 🌐 Deployment Platform

The Mental Health Check-in application is deployed on **Vercel**, a cloud platform optimized for frontend frameworks and static sites. Vercel provides:

- ⚡ **Instant deployments** with automatic builds
- 🌍 **Global CDN** for fast worldwide access
- 🔒 **Automatic SSL** certificates
- 📊 **Analytics** and performance monitoring
- 🔄 **Git integration** for continuous deployment

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Vercel account** - [Sign up](https://vercel.com/signup)
- ✅ **Firebase project** configured with Authentication and Firestore
- ✅ **GitHub repository** with your code
- ✅ **Environment variables** prepared

## 🛠️ Step-by-Step Deployment

### 1. 📁 **Prepare Your Project**

#### Update Dependencies

```bash
# Ensure all dependencies are in package.json
npm install
npm audit fix
```

#### Configure Firebase

```javascript
// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

#### Set Up Local Environment Variables

```bash
# Create .env.local file
echo "VITE_ENCRYPTION_KEY=your-super-secret-encryption-key" > .env.local
```

### 2. 🌐 **Deploy to Vercel**

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from Project Root**

   ```bash
   vercel
   ```

4. **Follow CLI Prompts**
   - Link to existing project or create new
   - Set up project settings
   - Configure build settings

#### Option B: Using Vercel Dashboard

1. **Import Project**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: React
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### 3. ⚙️ **Configure Environment Variables**

#### In Vercel Dashboard:

1. Go to **Project Settings**
2. Navigate to **Environment Variables**
3. Add the following variables:

| Variable Name         | Value               | Environment                      |
| --------------------- | ------------------- | -------------------------------- |
| `VITE_ENCRYPTION_KEY` | Your encryption key | Production, Preview, Development |

#### Example Configuration:

```bash
# Production Environment Variables
VITE_ENCRYPTION_KEY=your-production-encryption-key-here
```

### 4. 🔐 **Configure Firebase Security Rules**

#### Firestore Security Rules:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own check-ins
    match /users/{userId}/checkins/{checkinId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Users can only access their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### Authentication Settings:

```javascript
// Enable Email/Password authentication
// Configure authorized domains in Firebase Console
```

### 5. 🎯 **Domain Configuration**

#### Default Domain

Vercel automatically provides a domain:

```
https://your-project-name.vercel.app
```

#### Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings as instructed
4. SSL certificate is automatically provisioned

### 6. ✅ **Verify Deployment**

#### Post-Deployment Checklist:

- [ ] **Application loads** without errors
- [ ] **Authentication works** (login/signup)
- [ ] **Firebase connection** is established
- [ ] **Data encryption/decryption** functions properly
- [ ] **Responsive design** works on all devices
- [ ] **Check-in form** submits successfully
- [ ] **Dashboard displays** user data correctly

#### Testing Commands:

```bash
# Test locally before deployment
npm start

# Build and test production build
npm run build
npm run preview
```

## 🔍 **Monitoring & Analytics**

### Vercel Analytics

- **Performance metrics** automatically tracked
- **Core Web Vitals** monitoring
- **User analytics** and traffic insights

### Firebase Console

- **Authentication users** and activity
- **Firestore usage** and query performance
- **Security rules** effectiveness

## 🚨 **Troubleshooting**

### Common Issues & Solutions

#### 1. **Build Failures**

```bash
# Check build logs in Vercel dashboard
# Common fixes:
npm run build  # Test locally first
npm audit fix  # Fix dependency vulnerabilities
```

#### 2. **Environment Variables Not Working**

- Ensure variables are prefixed with `VITE_`
- Check variable names match exactly
- Redeploy after adding variables

#### 3. **Firebase Connection Issues**

- Verify Firebase config is correct
- Check Firebase project settings
- Ensure domain is authorized in Firebase Console

#### 4. **Encryption/Decryption Errors**

- Verify `VITE_ENCRYPTION_KEY` is set
- Check key consistency across environments
- Ensure key is secure and not logged

### 🆘 **Getting Help**

If you encounter issues:

1. **Check Vercel Logs**

   ```bash
   vercel logs your-deployment-url
   ```

2. **Firebase Console Errors**

   - Check Authentication logs
   - Review Firestore usage
   - Verify security rules

3. **Local Testing**
   ```bash
   npm run build && npm run preview
   ```

## 📊 **Performance Optimization**

### Build Optimizations

- **Code splitting** automatically handled by Vite
- **Asset optimization** for faster loading
- **Caching strategies** for static assets

### Firebase Optimization

- **Firestore indexes** for efficient queries
- **Connection pooling** for better performance
- **Offline support** for better user experience

## 🔄 **Continuous Deployment**

### Automatic Deployments

- **Git integration** triggers automatic builds
- **Branch previews** for testing features
- **Production deployments** from main branch

### Deployment Workflow

```
1. Push to GitHub repository
2. Vercel detects changes
3. Automatic build process
4. Deploy to production/preview
5. Success notification
```

---

## 🌟 **Live Application**

**Production URL**: [https://mental-health-checkin.vercel.app](https://mental-health-checkin.vercel.app)

---

<div align="center">
  <p>🎉 <strong>Congratulations!</strong> Your Mental Health Check-in application is now live!</p>
  <p>For support, contact: <a href="mailto:nawaidwork@gmail.com">nawaidwork@gmail.com</a></p>
</div>
