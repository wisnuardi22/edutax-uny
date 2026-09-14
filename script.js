const APP_KEY = "edutax_state";

const defaultState = {
    session: {
        authenticated: false,
        username: "",
        impersonating: null
    },

    relatedPersons: [],
    relatedTaxpayers: [],
    representatives: [],
    roleAssignments: [],
    permissions: [],
    tku: []
};


let state = loadState();


function loadState() {
    const saved = localStorage.getItem(APP_KEY);

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        APP_KEY,
        JSON.stringify(defaultState)
    );

    return structuredClone(defaultState);
}


function saveState() {
    localStorage.setItem(
        APP_KEY,
        JSON.stringify(state)
    );
}


const app = document.getElementById("app");



function render() {

    if (state.session.authenticated) {

        document
            .getElementById("login-view")
            .classList.add("hidden");

        document
            .getElementById("main-view")
            .classList.remove("hidden");

        renderDashboard();

    } else {

        document
            .getElementById("login-view")
            .classList.remove("hidden");

        document
            .getElementById("main-view")
            .classList.add("hidden");

    }

}



document
    .getElementById("login-form")
    .addEventListener(
        "submit",
        function(e){

            e.preventDefault();


            const username =
                document.getElementById("username").value;


            const password =
                document.getElementById("password").value;


            if(
                username === "edutax" &&
                password === "edutax2026"
            ){

                state.session = {
                    authenticated:true,
                    username:"edutax",
                    impersonating:null
                };


                saveState();

                render();

            }
            else {

                alert(
                    "ID Pengguna atau Kata Sandi salah"
                );

            }

        }
    );





// PASSWORD SHOW / HIDE

document
    .getElementById("toggle-password")
    .addEventListener(
        "click",
        function(){

            const input =
                document.getElementById("password");


            if(input.type==="password"){
                input.type="text";
            }
            else{
                input.type="password";
            }

        }
    );





// SIDEBAR ROUTING

document
.querySelectorAll(".sidebar-menu button[data-page]")
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            const page =
                button.dataset.page;


            router(page);

        }
    );

});





function router(page){

    switch(page){

        case "dashboard":
            renderDashboard();
            break;


        case "impersonating":
            renderImpersonating();
            break;


        case "related":
            renderRelated();
            break;


        case "representative":
            renderRepresentative();
            break;


        case "role":
            renderRole();
            break;


        case "permission":
            renderPermission();
            break;


        case "tku":
            renderTKU();
            break;


        default:
            renderDashboard();

    }


    document.getElementById(
        "breadcrumb"
    ).innerText =
        page.toUpperCase();

}





function setContent(html){

    document
        .getElementById("content-area")
        .innerHTML = html;

}





function emptyState(title){

return `

<div class="dashboard-card">

    <h2>${title}</h2>

    <p>
        Belum ada data.
        Silakan tambahkan data secara manual.
    </p>

</div>

`;

}





// INITIAL LOAD

render();