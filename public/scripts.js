window.onload = () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginPage = document.getElementById("login");
    const dashboardPage = document.getElementById("dashboard");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      // Validación simple
      if (email === "admin@example.com" && password === "contra") {
        loginPage.style.display = "none";
        dashboardPage.style.display = "block";
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  };
  