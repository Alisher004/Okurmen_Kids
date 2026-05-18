// firestore.rules менен бирдей — Firebase Console → Firestore → Rules → Publish
export const FIRESTORE_RULES_SOURCE = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    match /courses/{docId} {
      allow read: if true;
      allow write: if signedIn();
    }

    match /teachers/{docId} {
      allow read: if true;
      allow write: if signedIn();
    }

    match /students/{docId} {
      allow read: if true;
      allow write: if signedIn();
    }

    match /reviews/{docId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'review', 'rating', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.review is string
        && request.resource.data.review.size() > 0
        && request.resource.data.rating is int
        && request.resource.data.rating >= 1
        && request.resource.data.rating <= 5
        && request.resource.data.createdAt is timestamp;
      allow update, delete: if signedIn();
    }

    match /leads/{docId} {
      allow read: if signedIn();
      allow create: if request.resource.data.keys().hasAll(['name', 'phone', 'age', 'course', 'status', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0
        && request.resource.data.phone is string
        && request.resource.data.phone.size() > 0
        && request.resource.data.age is string
        && request.resource.data.course is string
        && request.resource.data.status == 'new'
        && request.resource.data.createdAt is timestamp;
      allow update, delete: if signedIn();
    }
  }
}
`;
