window.onload = function () {
  let userName = prompt("Please enter the student name:");
  if (userName) {
    document.getElementById("ak").innerText =
      "Welcome to ICIT Institute, " + userName + "!";
  } else {
    document.getElementById("ak").innerText =
      "Welcome to ICIT Institute!";
  }

  // Loader Hide
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 2000);

  // ✅ Hamburger Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // Menu toggle on click
  hamburger.addEventListener("click", function (event) {
    event.stopPropagation(); // 👉 important
    navLinks.classList.toggle("show");
  });

  // ✅ Close menu when clicked outside
  document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove("show");
    }
  });
};
