document.addEventListener("DOMContentLoaded", function() {
    let loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        mostrarUsuario(loggedInUser);
    }

    // Validación de Login
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        let valid = true;

        if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("emailError").textContent = "⚠️ Ingresa un correo válido.";
            valid = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "⚠️ La contraseña debe tener al menos 6 caracteres.";
            valid = false;
        } else {
            document.getElementById("passwordError").textContent = "";
        }

        if (valid) {
            alert("Inicio de sesión exitoso ✅");

            let storedName = localStorage.getItem(email);
            if (storedName) {
                localStorage.setItem("user", storedName);
                mostrarUsuario(storedName);
            } else {
                alert("Correo no registrado ❌");
            }
            cerrarModal("loginModal");
        }
    });

    // Validación de Registro
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("registerName").value.trim();
        let email = document.getElementById("registerEmail").value.trim();
        let password = document.getElementById("registerPassword").value.trim();
        let valid = true;

        if (name.length < 3) {
            document.getElementById("nameError").textContent = "⚠️ El nombre debe tener al menos 3 caracteres.";
            valid = false;
        } else {
            document.getElementById("nameError").textContent = "";
        }

        if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("registerEmailError").textContent = "⚠️ Ingresa un correo válido.";
            valid = false;
        } else {
            document.getElementById("registerEmailError").textContent = "";
        }

        if (password.length < 8) {
            document.getElementById("registerPasswordError").textContent = "⚠️ La contraseña debe tener al menos 8 caracteres.";
            valid = false;
        } else {
            document.getElementById("registerPasswordError").textContent = "";
        }

        if (valid) {
            alert("Registro exitoso ✅");

            localStorage.setItem(email, name);
            localStorage.setItem("user", name); 

            mostrarUsuario(name);
            cerrarModal("registerModal");
        }
    });

    function mostrarUsuario(userName) {
        document.getElementById("loginNav").style.display = "none"; 
        document.getElementById("registerNav").style.display = "none";
        document.getElementById("user-info").style.display = "block"; 
        document.getElementById("user-name").textContent = userName; 
    }

    function cerrarModal(modalId) {
        let modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.hide();
    }

    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem("user"); 
        location.reload(); 
    });
});

