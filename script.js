const demoAccount = {
    username: "edutax",
    password: "edutax2026"
};

const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const refreshCaptchaButton = document.getElementById("refreshCaptcha");
const captchaCode = document.getElementById("captchaCode");

const pageContainer = document.querySelector(".page-container");
const dashboard = document.getElementById("dashboard");

const accountButton = document.getElementById("accountButton");
const accountMenu = document.getElementById("accountMenu");

function generateCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";

    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return captcha;
}

function refreshCaptcha() {
    captchaCode.textContent = generateCaptcha();
}

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});

refreshCaptchaButton.addEventListener("click", refreshCaptcha);

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const captchaInput = document.getElementById("captchaInput").value.trim();
    const currentCaptcha = captchaCode.textContent;

    if (username === "" || password === "" || captchaInput === "") {
        alert("Silakan lengkapi seluruh data login.");
        return;
    }

    if (username !== demoAccount.username) {
        alert("ID Pengguna tidak sesuai.");
        return;
    }

    if (password !== demoAccount.password) {
        alert("Kata sandi tidak sesuai.");
        return;
    }

    if (captchaInput !== currentCaptcha) {
        alert("Kode keamanan tidak sesuai.");
        refreshCaptcha();
        return;
    }

    const sessionData = {
        username: username,
        loginStatus: true,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem("edutaxSession", JSON.stringify(sessionData));

    openDashboard();
});

function openDashboard() {
    pageContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
    localStorage.setItem("activeAccount", "personal");
}

accountButton.addEventListener("click", function () {
    if (accountMenu.style.display === "block") {
        accountMenu.style.display = "none";
    } else {
        accountMenu.style.display = "block";
    }
});

function selectAccount(type) {
    const impersonatingBanner = document.getElementById("impersonatingBanner");
    const entityName = document.getElementById("entityName");
    const roleName = document.getElementById("roleName");
    const activeEntity = document.getElementById("activeEntity");
    const activeRole = document.getElementById("activeRole");

    if (type === "personal") {
        accountButton.innerHTML = "3271022601770007 RAKA ▼";
        impersonatingBanner.classList.add("hidden");
        entityName.textContent = "RAKA";
        roleName.textContent = "Main Account";
        activeEntity.textContent = "RAKA";
        activeRole.textContent = "Main Account";
        localStorage.setItem("activeAccount", "personal");
    }

    if (type === "company") {
        accountButton.innerHTML = "0012345678910000 PT EDU TAX UNY ▼";
        impersonatingBanner.classList.remove("hidden");
        entityName.textContent = "PT EDU TAX UNY";
        roleName.textContent = "PIC";
        activeEntity.textContent = "PT EDU TAX UNY";
        activeRole.textContent = "PIC";
        localStorage.setItem("activeAccount", "company");
    }

    accountMenu.style.display = "none";
}