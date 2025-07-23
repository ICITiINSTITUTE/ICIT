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