// firestore.rules менен бирдей — Firebase Console → Firestore → Rules → Publish
export const FIRESTORE_RULES_SOURCE = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function userDoc() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid));
    }

    function isAdmin() {
      return signedIn() && (
        (exists(/databases/$(database)/documents/users/$(request.auth.uid))
          && userDoc().data.role == 'admin')
        || exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }

    function isManager() {
      return signedIn()
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && userDoc().data.role == 'manager';
    }

    function isStaff() {
      return isAdmin() || isManager();
    }

    match /users/{userId} {
      allow read: if signedIn() && request.auth.uid == userId;
      allow write: if false;
    }

    match /admins/{adminId} {
      allow read: if signedIn() && request.auth.uid == adminId;
      allow write: if false;
    }

    match /banners/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /faq/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /testQuestions/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /videoReviews/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /courses/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /teachers/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /students/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /leads/{docId} {
      allow read: if isStaff();
      allow create: if request.resource.data.keys().hasAll(['name', 'phone', 'age', 'course', 'status', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.phone is string
        && request.resource.data.phone.size() > 0
        && request.resource.data.age is string
        && request.resource.data.course is string
        && request.resource.data.status == 'new'
        && request.resource.data.createdAt is timestamp;
      allow update: if isStaff();
      allow delete: if isAdmin();
    }

    match /trialLessons/{docId} {
      allow read: if isStaff();
      allow create: if request.resource.data.keys().hasAll(['childName', 'parentPhone', 'childAge', 'courseInterest', 'status', 'createdAt'])
        && request.resource.data.childName is string
        && request.resource.data.childName.size() > 0
        && request.resource.data.parentPhone is string
        && request.resource.data.parentPhone.size() > 0
        && request.resource.data.childAge is string
        && request.resource.data.courseInterest is string
        && request.resource.data.status == 'new'
        && request.resource.data.createdAt is timestamp;
      allow update: if isStaff();
      allow delete: if isAdmin();
    }

    match /testResults/{docId} {
      allow read: if isStaff();
      allow create: if request.resource.data.keys().hasAll(['name', 'score', 'totalQuestions', 'percentage', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.score is int
        && request.resource.data.score >= 0
        && request.resource.data.totalQuestions is int
        && request.resource.data.totalQuestions > 0
        && request.resource.data.percentage is int
        && request.resource.data.percentage >= 0
        && request.resource.data.percentage <= 100
        && request.resource.data.createdAt is timestamp;
      allow update, delete: if isAdmin();
    }
  }
}
`;
