window.onload = () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      // Validación simple
      if (email === "admin@example.com" && password === "contra") {
        window.location.href = "dashboard.html";
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  };