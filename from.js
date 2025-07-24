<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

  document.getElementById("payBtn").onclick = function (e) {
    var options = {
      "key": "rzp_test_YourKeyHere", // Replace with your Test Key
      "amount": 50000, // Amount in paise: ₹500 = 50000
      "currency": "INR",
      "name": "ICIT Computer Institute",
      "description": "CCC Form Payment",
      "handler": function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // आप यहाँ form को submit कर सकते हैं या Google Sheet से जोड़ सकते हैं
      },
      "theme": {
        "color": "#004080"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  }
document.getElementById("enrollmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value,
    fatherName: document.getElementById("fatherName").value,
    motherName: document.getElementById("motherName").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address1: document.getElementById("address1").value,
    state: document.getElementById("state").value,
    district: document.getElementById("district").value,
    pincode: document.getElementById("pincode").value,
    qualification: document.getElementById("qualification").value,
    examCycle: document.getElementById("examCycle").value,
    apaarID: document.getElementById("apaarID").value,
  };

  fetch("YOUR_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(res => {
    alert("Form Submitted Successfully");
  })
  .catch(err => {
    alert("Error submitting form");
    console.error(err);
  });
});
function generateRollNumber() {
  const prefix = "CCC"; // Course prefix
  const timestamp = Date.now(); // Current time in milliseconds
  return `${prefix}-${timestamp}`; // e.g. CCC-1721817359123
}
const rollNumber = generateRollNumber();
data.rollNumber = rollNumber;
document.getElementById("rollNoDisplay").innerText = rollNumber;
fetch("YOUR_WEB_APP_URL", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" }
})
.then(res => res.text())
.then(res => {
  alert("Form Submitted Successfully!\n" + res); // Shows roll number like CCC-00001
  document.getElementById("rollNoDisplay").innerText = res;
})

