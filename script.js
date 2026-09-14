const APP_STATE = "edutax_session";

const userAccount = {
    username: "edutax",
    password: "edutax2026"
};


const app = {
    login: false,
    username: ""
};


function saveSession() {
    localStorage.setItem(
        APP_STATE,
        JSON.stringify(app)
    );
}


function loadSession() {
    const data = localStorage.getItem(APP_STATE);

    if (data) {
        Object.assign(
            app,
            JSON.parse(data)
        );
    }
}


function showLogin() {
    document.querySelector(".login-page").classList.remove("hidden");
    document.getElementById("application").classList.add("hidden");
}


function showApplication() {
    document.querySelector(".login-page").classList.add("hidden");
    document.getElementById("application").classList.remove("hidden");

    renderApplication();
}


function renderApplication() {

    document.getElementById("sidebar").innerHTML = `
        <div class="sidebar-title">
            EDUTAX
        </div>

        <button>
            Dashboard
        </button>

        <button>
            Impersonating
        </button>

        <button>
            Pihak Terkait
        </button>

        <button>
            Wakil / Kuasa
        </button>

        <button>
            Tetapkan Role
        </button>

        <button>
            Permission
        </button>

        <button>
            TKU
        </button>
    `;


    document.getElementById("topbar").innerHTML = `
        <div>
            Main Account :
            ${app.username}
        </div>
    `;


    document.getElementById("content").innerHTML = `
        <div class="dashboard-card">

            <h2>
                Dashboard EDUTAX
            </h2>

            <p>
                Educational Tax Administration Simulation
            </p>

            <br>

            <p>
                Belum terdapat data.
                Silakan input data melalui modul yang tersedia.
            </p>

        </div>
    `;
}



document.addEventListener(
    "DOMContentLoaded",
    function(){

        loadSession();


        if(app.login){
            showApplication();
        }
        else{
            showLogin();
        }


        const form =
        document.getElementById("login-form");


        form.addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                const username =
                document.getElementById("username").value;


                const password =
                document.getElementById("password").value;


                if(
                    username === userAccount.username &&
                    password === userAccount.password
                ){

                    app.login = true;
                    app.username = username;

                    saveSession();

                    showApplication();

                }
                else{

                    alert(
                        "ID Pengguna atau Kata Sandi salah"
                    );

                }

            }
        );



        const passwordInput =
        document.getElementById("password");


        const toggle =
        document.getElementById("show-password");


        toggle.addEventListener(
            "click",
            function(){

                if(
                    passwordInput.type === "password"
                ){

                    passwordInput.type = "text";

                }
                else{

                    passwordInput.type = "password";

                }

            }
        );

    }
);