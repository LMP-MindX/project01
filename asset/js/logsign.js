document.addEventListener('DOMContentLoaded', () => {
    const registerCard = document.getElementById('register-card');
    const loginCard = document.getElementById('login-card');
    const welcomeSection = document.getElementById('welcome-section');

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    const registerMessage = document.getElementById('register-message');
    const loginMessage = document.getElementById('login-message');

    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');
    const logoutButton = document.getElementById('logout-button');
    const welcomeUsername = document.getElementById('welcome-username');

    // Hàm hiển thị thông báo
    function displayMessage(element, message, type = 'danger') {
        element.textContent = message;
        element.className = `alert alert-${type}`; 
        element.classList.remove('d-none');
        setTimeout(() => {
            element.classList.add('d-none');
        }, 3000); // Ẩn sau 3 giây
    }

    // Hàm kiểm tra trạng thái đăng nhập khi tải trang
    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            welcomeUsername.textContent = `Xin chào, ${loggedInUser}!`;
            showSection('welcome');
        } else {
            showSection('register'); // Mặc định hiển thị form đăng ký
        }
    }

    // Hàm chuyển đổi giữa các phần (đăng ký, đăng nhập, chào mừng)
    function showSection(section) {
        registerCard.classList.add('d-none');
        loginCard.classList.add('d-none');
        welcomeSection.classList.add('d-none');

        if (section === 'register') {
            registerCard.classList.remove('d-none');
        } else if (section === 'login') {
            loginCard.classList.remove('d-none');
        } else if (section === 'welcome') {
            welcomeSection.classList.remove('d-none');
        }
    }

    // Xử lý sự kiện Đăng Ký
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Kiểm tra xem tên người dùng đã tồn tại chưa
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            displayMessage(registerMessage, 'Tên người dùng đã tồn tại!', 'danger');
        } else {
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            displayMessage(registerMessage, 'Đăng ký thành công! Vui lòng đăng nhập.', 'success');
            registerForm.reset();
            setTimeout(() => {
                showSection('login'); // Chuyển sang form đăng nhập sau khi đăng ký thành công
            }, 1000); // Chờ 1 giây để thông báo hiển thị
        }
    });

    // Xử lý sự kiện Đăng Nhập
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userFound = users.find(user => user.username === username && user.password === password);

        if (userFound) {
            localStorage.setItem('loggedInUser', username); // Lưu trạng thái đăng nhập
            welcomeUsername.textContent = `Xin chào, ${username}!`;
            displayMessage(loginMessage, 'Đăng nhập thành công!', 'success');
            loginForm.reset();
            setTimeout(() => {
                showSection('welcome');
            }, 1000);
        } else {
            displayMessage(loginMessage, 'Tên người dùng hoặc mật khẩu không đúng!', 'danger');
        }
    });

    // Chuyển đổi giữa Đăng Ký và Đăng Nhập
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('login');
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('register');
    });

    // Xử lý Đăng Xuất
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Xóa trạng thái đăng nhập
        displayMessage(loginMessage, 'Bạn đã đăng xuất.', 'info');
        showSection('login'); // Chuyển về form đăng nhập
    });

    // Kiểm tra trạng thái đăng nhập khi tải trang lần đầu
    checkLoginStatus();
});

// hi
function openForm() {
  document.getElementById("auth-section").style.display = "block";
}