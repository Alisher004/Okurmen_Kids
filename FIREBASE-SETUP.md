# Firebase Setup Guide

## Overview
This guide will help you integrate Firebase into your Okurmen Kids project for production-ready data management.

## Prerequisites
- A Google account
- Node.js and npm installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `okurmen-kids` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the web icon (`</>`)
2. Register app with nickname: `Okurmen Kids Website`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Paste your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll set rules next)
4. Select your preferred location (closest to your users)
5. Click "Enable"

## Step 5: Configure Firestore Security Rules

Go to "Firestore Database" > "Rules" and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Courses - Public read, admin write
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Teachers - Public read, admin write
    match /teachers/{teacherId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Students - Public read, admin write
    match /students/{studentId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Leads - Anyone can create, only admins can read/update/delete
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

Click "Publish"

## Step 6: Seed Initial Data (Optional)

You can manually add initial data through Firebase Console or use the migration script:

1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `courses`
4. Add documents with fields matching your Course interface

Or run the data migration (if you have existing localStorage data):

```bash
npm run migrate-to-firebase
```

## Step 7: Set Up Authentication (For Admin Panel)

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Go to "Users" tab
5. Click "Add user"
6. Create admin user with email and password

## Step 8: Set Admin Custom Claims

To give admin privileges, use Firebase CLI:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Set admin claim (replace with your admin email)
firebase functions:shell
admin.auth().getUserByEmail('admin@okurmen.kg').then(user => {
  return admin.auth().setCustomUserClaims(user.uid, {admin: true})
})
```

## Step 9: Update DataContext to Use Firebase

The project is already configured to use Firebase hooks. To switch from localStorage to Firebase:

1. Ensure `.env.local` is configured
2. Restart your development server
3. The app will automatically use Firebase when configured

## Step 10: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Try submitting a contact form (creates a lead)
4. Check Firebase Console > Firestore Database to see the new lead

## Fallback Behavior

The app is designed to work with or without Firebase:
- **With Firebase configured**: Uses real-time Firestore database
- **Without Firebase**: Falls back to localStorage (development only)

## Production Deployment

### Option 1: Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

### Option 2: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Build your app
npm run build

# Deploy
firebase deploy --only hosting
```

## Security Checklist

- [ ] Firebase security rules are configured
- [ ] Environment variables are set in production
- [ ] Admin authentication is set up
- [ ] `.env.local` is in `.gitignore`
- [ ] API keys are restricted in Firebase Console (optional but recommended)

## Troubleshooting

### "Firebase not configured" error
- Check that all environment variables are set in `.env.local`
- Restart your development server after adding env variables

### "Permission denied" errors
- Verify Firestore security rules are published
- Check that admin custom claims are set for admin users

### Data not syncing
- Check browser console for errors
- Verify Firebase project is active
- Check network tab for failed requests

## Support

For issues specific to Firebase, consult:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup)
