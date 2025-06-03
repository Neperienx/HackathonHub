# Firestore Database Setup Guide

## 1. Configure Firestore Security Rules

Go to your Firebase Console → Firestore Database → Rules and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects collection rules
    match /projects/{projectId} {
      // Allow users to read and write their own projects
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      
      // Allow users to create new projects
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      
      // Allow anyone to read public projects
      allow read: if resource.data.status == 'public';
    }
  }
}
```

## 2. Enable Authentication Methods

In Firebase Console → Authentication → Sign-in method:
- Enable "Email/Password" 
- Enable "Google" (add your domain to authorized domains)

## 3. Create Firestore Database

In Firebase Console → Firestore Database:
- Click "Create database"
- Choose "Start in test mode" initially
- Select your preferred region

## 4. Optional: Create Composite Indexes (for better performance)

If you want to use orderBy queries for better performance, create these indexes in Firebase Console → Firestore Database → Indexes:

**Index 1: User Projects**
- Collection: `projects`
- Fields: `userId` (Ascending), `updatedAt` (Descending)

**Index 2: Public Projects**  
- Collection: `projects`
- Fields: `status` (Ascending), `updatedAt` (Descending)

## 5. Verify Your Firebase Configuration

Make sure your environment variables are set:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID` 
- `VITE_FIREBASE_APP_ID`

The app will work without indexes but may have slower performance for large datasets.