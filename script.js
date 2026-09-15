const demoAccount = {
    username: "edutax",
    password: "edutax2026"
};

const captchaValue = "3DNQEN";

const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const refreshCaptchaButton = document.getElementById("refreshCaptcha");
const captchaCode = document.getElementById("captchaCode");

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

refreshCaptchaButton.addEventListener(
    "click",
    refreshCaptcha
);

loginForm.addEventListener(
    "submit",
    function (event) {
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

        localStorage.setItem(
            "edutaxSession",
            JSON.stringify(sessionData)
        );

        window.location.href = "dashboard.html";
    }
);