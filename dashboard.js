/* =========================
   EDU TAX DASHBOARD ENGINE
   ROLE ACCESS + IMPERSONATING
========================= */

/*
   CHECK LOGIN SESSION
*/
const session = JSON.parse(
    localStorage.getItem("edutaxSession")
);

if (!session) {
    window.location.href = "index.html";
}

/*
   ELEMENT
*/
const accountButton = document.getElementById("accountButton");
const accountMenu = document.getElementById("accountMenu");
const impersonatingBanner = document.getElementById("impersonatingBanner");
const entityName = document.getElementById("entityName");
const roleName = document.getElementById("roleName");
const taxpayerId = document.getElementById("taxpayerId");
const activeEntity = document.getElementById("activeEntity");
const activeRole = document.getElementById("activeRole");

/*
   ACCOUNT DROPDOWN
*/
accountButton.addEventListener(
    "click",
    function () {
        if (
            accountMenu.style.display === "block"
        ) {
            accountMenu.style.display = "none";
        } else {
            accountMenu.style.display = "block";
        }
    }
);

/*
   SELECT ACCOUNT
*/
function selectAccount(type) {
    if (type === "personal") {
        setPersonalAccount();
    }

    if (type === "company") {
        setCompanyAccount();
    }

    accountMenu.style.display = "none";
}

/*
   MAIN ACCOUNT
*/
function setPersonalAccount() {
    accountButton.innerHTML = `
    3271022601770007
    <br>
    RAKA ▼
    `;

    impersonatingBanner
        .classList
        .add("hidden");

    entityName.textContent = "RAKA";
    roleName.textContent = "Main Account";
    taxpayerId.textContent = "3271022601770007";
    activeEntity.textContent = "RAKA";
    activeRole.textContent = "Main Account";

    localStorage.setItem(
        "activeTaxpayer",
        JSON.stringify({
            id: "3271022601770007",
            name: "RAKA",
            role: "Main Account"
        })
    );
}

/*
   TAXPAYER / IMPERSONATING
*/
function setCompanyAccount() {
    accountButton.innerHTML = `
    0012345678910000
    <br>
    PT EDU TAX UNY ▼
    `;

    impersonatingBanner
        .classList
        .remove("hidden");

    entityName.textContent = "PT EDU TAX UNY";
    roleName.textContent = "PIC";
    taxpayerId.textContent = "0012345678910000";
    activeEntity.textContent = "PT EDU TAX UNY";
    activeRole.textContent = "PIC";

    localStorage.setItem(
        "activeTaxpayer",
        JSON.stringify({
            id: "0012345678910000",
            name: "PT EDU TAX UNY",
            role: "PIC"
        })
    );
}

/*
   LOAD LAST ACTIVE ACCOUNT
*/
function loadActiveAccount() {
    const active = JSON.parse(
        localStorage.getItem(
            "activeTaxpayer"
        )
    );

    if (!active) {
        return;
    }

    if (
        active.role === "PIC"
    ) {
        setCompanyAccount();
    } else {
        setPersonalAccount();
    }
}

loadActiveAccount();

/*
   CLOSE DROPDOWN WHEN CLICK OUTSIDE
*/
document.addEventListener(
    "click",
    function (event) {
        if (
            !event.target.closest(
                ".account-wrapper"
            )
        ) {
            accountMenu.style.display = "none";
        }
    }
);