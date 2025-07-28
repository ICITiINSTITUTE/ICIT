
  // Function to generate random 6-digit code
  function generateCaptcha() {
    const captcha = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    document.getElementById("captchaDisplay").innerText = captcha;
    document.getElementById("captchaDisplay").dataset.code = captcha; // store in data-code for validation
  }

  // Call this function when page loads
  window.onload = generateCaptcha;

  // Optional: You can add refresh on click
  document.getElementById("captchaDisplay").addEventListener("click", generateCaptcha);

  // CAPTCHA validation on form submit (optional)
  document.getElementById("cccApplicationForm").addEventListener("submit", function(e) {
    const userCaptcha = document.getElementById("captchaInput").value.trim();
    const realCaptcha = document.getElementById("captchaDisplay").dataset.code;

    if (userCaptcha !== realCaptcha) {
      alert("Incorrect CAPTCHA. Please try again.");
      generateCaptcha(); // regenerate new one
      e.preventDefault(); // prevent form submit
    }
  });

