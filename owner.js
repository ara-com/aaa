const form = document.getElementById("addForm");
const attendanceBody = document.getElementById("attendanceBody");

// Show/hide employee form
function toggleForm() {
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add employee with the current user's UID
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const doj = document.getElementById("doj").value;

  try {
    const user = firebase.auth().currentUser;
    if (user) {
      await db.collection("employees").doc(user.uid).set({ name, designation, doj });
      alert("Employee added!");
      form.reset();
      form.style.display = "none";
    } else {
      alert("You must be logged in to add employees.");
    }
  } catch (err) {
    alert("Error adding employee: " + err.message);
  }
});

// Load attendance records and map to employee details
async function loadAttendance() {
  try {
    // Load attendance records ordered by date
    const attendanceSnap = await db.collection("attendance").orderBy("date", "desc").get();

    if (attendanceSnap.empty) {
      attendanceBody.innerHTML = `<tr><td colspan="5">No attendance records found.</td></tr>`;
      return;
    }

    // For each attendance entry, get employee info
    for (const doc of attendanceSnap.docs) {
      const entry = doc.data();
      let empName = "Unknown";
      let empDesig = "-";

      try {
        const empDoc = await db.collection("employees").doc(entry.userId).get();
        if (empDoc.exists) {
          const emp = empDoc.data();
          empName = emp.name || "Unknown";
          empDesig = emp.designation || "-";
        }
      } catch (err) {
        console.warn(`Error fetching employee ${entry.userId}:`, err);
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${empName}</td>
        <td>${empDesig}</td>
        <td>${entry.date || "-"}</td>
        <td>${entry.location?.time || "-"}</td>
        <td>${entry.valid ? "Yes" : "No"}</td>
      `;
      attendanceBody.appendChild(row);
    }
  } catch (err) {
    console.error("Failed to load attendance:", err);
    attendanceBody.innerHTML = `<tr><td colspan="5">Error loading attendance.</td></tr>`;
  }
}

// Load attendance on page load
window.onload = loadAttendance;
