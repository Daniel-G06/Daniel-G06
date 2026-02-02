function isPasswordSecure(pass) {
    const hasUpper = /[A-Z]/.test(pass);      
    const hasLower = /[a-z]/.test(pass);      
    const hasNumber = /[0-9]/.test(pass);     
    const hasSpecial = /[!@#$%^&*]/.test(pass); 

    return pass.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');

    if (loginContainer && registerContainer) {
        if (action === 'register') {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        } else {
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
        }
    }

    const regForm = document.getElementById('register-form');
    if (regForm) {
        regForm.onsubmit = function(e) {

            e.preventDefault();

            const firstName = document.getElementById('reg-firstName').value;
            const lastName = document.getElementById('reg-lastName').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;

            if (!isPasswordSecure(pass)) {
                const errorMsg = document.getElementById('login-error');
                errorMsg.textContent = "Паролата е грешна, моля опитайте отново!";
                errorMsg.classList.remove('hidden');
                return;     
            }

            const userData = { firstName, lastName, email, password: pass };
            
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            
            alert("Регистрацията беше успешна! Сега можете да влезете в профила си.");

            
            window.location.href = "form.html?action=login";
        };
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;
            
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && storedUser.email === email && storedUser.password === pass) {
                localStorage.setItem('isLoggedIn', 'true');
                
                alert("Добре дошли, " + storedUser.firstName + "!");
                
                window.location.href = "index.html";
            } else {
                alert("Грешен имейл или парола!");
            }
        };
    }
});