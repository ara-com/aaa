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
  
  const authForm = document.getElementById("authForm");
  const authButton = document.getElementById("authButton");
  const switchMessage = document.getElementById("switchMessage");
  const formTitle = document.getElementById("formTitle");
  
  let isSignUp = false; // Track if we are in sign-up mode
  
  // Switch between Login and Sign Up
  document.getElementById("switchToSignUp").addEventListener("click", (e) => {
    e.preventDefault();
    isSignUp = true;
    formTitle.textContent = "Sign Up";
    authButton.textContent = "Sign Up";
    switchMessage.innerHTML = `Already have an account? <a href="#" id="switchToLogin">Login</a>`;
  
    // Switch back to login mode
    document.getElementById("switchToLogin").addEventListener("click", (e) => {
      e.preventDefault();
      isSignUp = false;
      formTitle.textContent = "Login";
      authButton.textContent = "Login";
      switchMessage.innerHTML = `Don't have an account? <a href="#" id="switchToSignUp">Sign Up</a>`;
    });
  });
  
  // Handle form submission (Login/Sign Up)
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (isSignUp) {
      // Sign Up Logic
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("uid", user.uid);
          window.location.href = "index.html";  // Redirect to user page after signup
        })
        .catch((error) => {
          document.getElementById("message").innerText = error.message;
        });
    } else {
      // Login Logic
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("uid", user.uid);
          window.location.href = "index.html";  // Redirect to user page after login
        })
        .catch((error) => {
          document.getElementById("message").innerText = error.message;
        });
    }
  });
  