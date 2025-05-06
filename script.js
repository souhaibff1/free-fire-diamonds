// تحديد الأزرار والعناصر
const loginSection = document.getElementById('loginSection');
const loginFormSection = document.getElementById('loginFormSection');
const loginForm = document.getElementById('loginForm');
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const loginStatus = document.getElementById('loginStatus');
const diamondsSection = document.getElementById('diamondsSection');
const purchaseBtn = document.getElementById('purchaseBtn');

let currentLoginMethod = '';

function showLoginForm(method) {
    if (method === 'facebook') {
        window.location.href = 'facebook-login.html';
    } else if (method === 'google') {
        window.location.href = 'login.html';
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const justLoggedIn = getQueryParam('loggedin') === '1';
    if (justLoggedIn) {
        loginSection.style.display = 'none';
        loginFormSection.style.display = 'none';
        loginStatus.style.display = 'block';
        setTimeout(() => {
            loginStatus.style.display = 'none';
            diamondsSection.style.display = 'block';
            // إزالة الباراميتر من الرابط بعد إظهار واجهة الشحن
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
    } else {
        // إذا لم يكن هناك باراميتر تسجيل دخول، أظهر واجهة تسجيل الدخول فقط
        loginSection.style.display = 'block';
        loginFormSection.style.display = 'none';
        loginStatus.style.display = 'none';
        diamondsSection.style.display = 'none';
        // إخفاء زر تسجيل الخروج
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.style.display = 'none';
        // احذف حالة الدخول من localStorage
        localStorage.removeItem('isLoggedIn');
    }
}

window.onload = function() {
    checkLoginState();
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (localStorage.getItem('isLoggedIn') === 'true') {
        logoutBtn.style.display = 'block';
    }
    logoutBtn.onclick = function() {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    };
    const diamondBtns = document.querySelectorAll('.diamond-btn');
    let selectedAmount = null;

    diamondBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            diamondBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedAmount = this.dataset.amount;
            purchaseBtn.disabled = false;
        });
    });

    purchaseBtn.onclick = function() {
        if (!selectedAmount) return;
        let minutes = 0;
        if (selectedAmount === '100') minutes = 10;
        else if (selectedAmount === '310') minutes = 30;
        else if (selectedAmount === '520') minutes = 50;
        else if (selectedAmount === '1060') minutes = 100;
        else if (selectedAmount === '2180') minutes = 200;
        showTimer(minutes);
    };

    function showTimer(minutes) {
        // تخزين الوقت في localStorage
        localStorage.setItem('timerMinutes', minutes);
        // التوجيه إلى صفحة العداد
        window.location.href = 'timer.html';
    }
}; 