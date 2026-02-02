function updateSessionUI() {
    const userMenu = document.querySelector('.user-menu');
    
    if (!userMenu) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (isLoggedIn && storedUser) {
        userMenu.innerHTML = `
            <span id="user-name-display">
                Здравейте, ${storedUser.firstName}
            </span>
            <span class="logout-link" onclick="handleLogout()">
                Изход
            </span>
        `;
    } else {
        userMenu.innerHTML = `
            <a href="#" class="nav-text-link">Профил</a>
            <div class="dropdown-content">
                <a href="form.html?action=login">Вход</a>
                <a href="form.html?action=register">Регистрация</a>
            </div>
        `;
    }
}

window.handleLogout = function() {
    
    localStorage.removeItem('isLoggedIn');
    
    alert("Излязохте успешно!");
    
    window.location.href = "index.html";
};

document.addEventListener('DOMContentLoaded', updateSessionUI);