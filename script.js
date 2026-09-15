/* =========================
   EDU TAX LOGIN SYSTEM
   ROLE ACCESS MODULE
========================= */

/*
   DEMO ACCOUNT
*/
const demoAccount = {
    username: "edutax",
    password: "edutax2026"
};

/*
   ELEMENT LOGIN
*/
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const refreshCaptchaButton = document.getElementById("refreshCaptcha");
const captchaCode = document.getElementById("captchaCode");

/*
   GENERATE CAPTCHA
*/
function generateCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";

    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }

    return captcha;
}

function refreshCaptcha() {
    captchaCode.textContent = generateCaptcha();
}

/*
   SHOW / HIDE PASSWORD
*/
togglePassword.addEventListener(
    "click",
    function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁";
        }
    }
);

/*
   REFRESH CAPTCHA BUTTON
*/
refreshCaptchaButton.addEventListener(
    "click",
    function () {
        refreshCaptcha();
    }
);

/*
   LOGIN PROCESS
*/
loginForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const username = document.getElementById("username")
            .value
            .trim();

        const password = document.getElementById("password")
            .value
            .trim();

        const captchaInput = document.getElementById("captchaInput")
            .value
            .trim();

        const currentCaptcha = captchaCode.textContent;

        /*
            CHECK EMPTY
        */
        if (
            username === "" ||
            password === "" ||
            captchaInput === ""
        ) {
            alert(
                "Silakan lengkapi seluruh data login."
            );
            return;
        }

        /*
            CHECK USERNAME
        */
        if (
            username !== demoAccount.username
        ) {
            alert(
                "ID Pengguna tidak sesuai."
            );
            return;
        }

        /*
            CHECK PASSWORD
        */
        if (
            password !== demoAccount.password
        ) {
            alert(
                "Kata sandi tidak sesuai."
            );
            return;
        }

        /*
            CHECK CAPTCHA
        */
        if (
            captchaInput !== currentCaptcha
        ) {
            alert(
                "Kode keamanan tidak sesuai."
            );
            refreshCaptcha();
            return;
        }

        /*
            CREATE SESSION
        */
        const sessionData = {
            username: username,
            role: "Main Account",
            taxpayer: "3271022601770007 RAKA",
            loginStatus: true,
            loginTime: new Date()
                .toISOString()
        };

        localStorage.setItem(
            "edutaxSession",
            JSON.stringify(
                sessionData
            )
        );

        /*
            REDIRECT
        */
        window.location.href = "dashboard.html";
    }
);