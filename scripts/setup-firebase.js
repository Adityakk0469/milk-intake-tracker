// Firebase Setup Instructions
console.log("🔥 Firebase Setup Instructions for Multi-Device Milk Tracker")
console.log("=".repeat(60))

console.log("\n1. Create a Firebase Project:")
console.log("   - Go to https://console.firebase.google.com/")
console.log("   - Click 'Create a project'")
console.log("   - Name it 'Milk Tracker' or similar")
console.log("   - Enable Google Analytics (optional)")

console.log("\n2. Setup Firestore Database:")
console.log("   - In your Firebase project, go to 'Firestore Database'")
console.log("   - Click 'Create database'")
console.log("   - Choose 'Start in test mode' for now")
console.log("   - Select a location close to your users")

console.log("\n3. Get your Firebase Config:")
console.log("   - Go to Project Settings (gear icon)")
console.log("   - Scroll down to 'Your apps'")
console.log("   - Click 'Add app' and choose 'Web'")
console.log("   - Register your app with a nickname")
console.log("   - Copy the firebaseConfig object")

console.log("\n4. Update the HTML file:")
console.log("   - Replace the firebaseConfig object in the HTML")
console.log("   - Your config should look like this:")

const exampleConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
}

console.log(JSON.stringify(exampleConfig, null, 2))

console.log("\n5. Security Rules (for production):")
console.log("   - Go to Firestore Database > Rules")
console.log("   - Replace with these rules for public access:")

const securityRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /milkEntries/{document} {
      allow read, write: if true;
    }
  }
}`

console.log(securityRules)

console.log("\n6. Deploy your app:")
console.log("   - Upload the HTML file to any web hosting service")
console.log("   - Or use Firebase Hosting for free hosting")

console.log("\n✅ Features enabled with Firebase:")
console.log("   - Real-time sync across all devices")
console.log("   - Automatic data backup")
console.log("   - Offline support with sync when reconnected")
console.log("   - No passkey needed - anyone can edit from any device")
console.log("   - Instant updates when someone adds/edits/deletes entries")

console.log("\n🔗 Useful Links:")
console.log("   - Firebase Console: https://console.firebase.google.com/")
console.log("   - Firestore Documentation: https://firebase.google.com/docs/firestore")
console.log("   - Firebase Hosting: https://firebase.google.com/docs/hosting")
