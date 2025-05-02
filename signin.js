// signin.js

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlUekdwgQCyU1_Ul3Z8h0YYXmtbcfbEv8",
    authDomain: "atten-969e6.firebaseapp.com",
    projectId: "atten-969e6",
    storageBucket: "atten-969e6.firebasestorage.app",
    messagingSenderId: "112657329201",
    appId: "1:112657329201:web:b14765b4f82ad433a0b910",
    measurementId: "G-YQJ7L8X93S"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Sign-in logic
  document.getElementById("signinForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Firebase sign-in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Store user UID in localStorage
        localStorage.setItem("uid", user.uid);
        
        // Redirect based on the user type (e.g., admin vs user)
        if (email === "owner@example.com") {  // Replace with your admin's email
          window.location.href = "owner.html";
        } else {
          window.location.href = "index.html"; // Regular user
        }
      })
      .catch((error) => {
        document.getElementById("errorMessage").innerText = error.message;
      });
  });
  