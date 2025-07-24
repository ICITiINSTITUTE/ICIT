 window.onload = function () {
      let userName = prompt("Please enter the student name:");
      if (userName) {
        document.getElementById("ak").innerText =
          "Welcome to ICIT Institute, " + userName + "!";
      } else {
        document.getElementById("ak").innerText =
          "Welcome to ICIT Institute!";
      }
    };
    function toggleMenu() {
      const navbar = document.getElementById("navbar");
      navbar.classList.toggle("active");}
        // जब पेज लोड हो जाए
  window.addEventListener("load", function () {
    // 2 सेकंड बाद हटा दें
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
    }, 2000); // 2000ms = 2 seconds
  });