// Get the logged-in user's UID from Firebase Authentication
const uid = localStorage.getItem("uid");

if (!uid) {
  window.location.href = "login.html"; // Redirect to login if not authenticated
}

// Fetch the user data from Firestore using the UID
async function loadUser() {
  const snapshot = await db.collection("employees").doc(uid).get();
  const user = snapshot.data();
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userDesig").innerText = user.designation;
}

// Mark attendance function
async function markAttendance() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const officeLat = 13.101475;  // Office latitude (replace with actual)
    const officeLng = 80.139172;  // Office longitude (replace with actual)

    const isNear = getDistance(lat, lng, officeLat, officeLng) <= 100;  // 100 meters radius

    await db.collection("attendance").add({
      userId: uid,  // Use the logged-in user's UID
      date: new Date().toISOString().split("T")[0],  // Current date
      time: new Date().toLocaleTimeString(),  // Current time
      location: { lat, lng },
      valid: isNear  // If the location is within the allowed radius
    });

    alert(isNear ? "Attendance marked!" : "You are not in office!");
  });
}

// Haversine formula to calculate the distance between two points (in meters)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2 - lat1) * Math.PI/180;
  const Δλ = (lon2 - lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;  // Returns the distance in meters
}

loadUser();  // Load user details when the page loads
