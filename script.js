/* =====================================================
   EDUTAX UNY
   Educational Tax Administration System
   SCRIPT VERSION TAHAP 5
===================================================== */


/* =========================
   STORAGE CONFIG
========================= */

const STORAGE = {

    session:"user_session",

    role:"role_selection",

    ebupot21:"ebupot21_data",

    unifikasi:"ebupot_unifikasi_data",

    progress:"learning_progress",

    history:"activity_history"

};




/* =========================
   INITIALIZATION
========================= */


document.addEventListener(
"DOMContentLoaded",
function(){

    checkSession();

    setupMenu();

});




/* =========================
   LOCAL STORAGE HELPER
========================= */


function saveData(key,data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}



function getData(key){

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}




/* =========================
   ACTIVITY HISTORY
========================= */


function addActivity(activity){


    let history =
    getData(STORAGE.history);



    history.push({

        activity:activity,

        time:new Date()
        .toLocaleString()

    });



    saveData(
        STORAGE.history,
        history
    );

}






/* =========================
   LOGIN
========================= */


function login(){


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



if(
username==="edutax"
&&
password==="edutax2026"
){


let session={


username:"edutax",

name:"Mahasiswa Demo",

login:true


};



saveData(
STORAGE.session,
session
);



addActivity(
"Login EduTax UNY"
);



alert(
"Selamat datang di EduTax UNY\n\nAnda menggunakan akun demo pembelajaran bersama"
);



openApplication();



}

else{


alert(
"ID Pengguna atau password salah"
);


}



}





/* =========================
   SESSION
========================= */


function checkSession(){


let session =
localStorage.getItem(
STORAGE.session
);



if(session){

    openApplication();

}



}



function openApplication(){


document
.getElementById("loginPage")
.classList.add("hidden");



document
.getElementById("appPage")
.classList.remove("hidden");



loadPage("dashboard");


}







/* =========================
   MENU
========================= */


function setupMenu(){


let buttons =
document.querySelectorAll(
".sidebar button[data-page]"
);



buttons.forEach(btn=>{


btn.addEventListener(
"click",
function(){


loadPage(
btn.dataset.page
);


});


});


}






function loadPage(page){


switch(page){


case "dashboard":

dashboardPage();

break;



case "role":

rolePage();

break;



case "ebupot21":

ebupot21Page();

break;



case "unifikasi":

unifikasiPage();

break;



case "spt":

sptPage();

break;



case "dokumen":

documentPage();

break;



case "progress":

progressPage();

break;



}



}








/* =========================
 DASHBOARD
========================= */


function dashboardPage(){


let ebupot =
getData(
STORAGE.ebupot21
);



document.getElementById(
"contentArea"
).innerHTML=`

<h1>
Dashboard Pembelajaran
</h1>


<div class="card">


<h3>
Ringkasan Dokumen
</h3>


<br>


<table>

<tr>

<th>
Total
</th>

<th>
Draft
</th>

<th>
Submitted
</th>

<th>
Selesai
</th>

</tr>


<tr>

<td>
${ebupot.length}
</td>


<td>
${ebupot.filter(x=>x.status==="Draft").length}
</td>


<td>
${ebupot.filter(x=>x.status==="Submitted").length}
</td>


<td>
0
</td>


</tr>


</table>


</div>


<br>


<div class="card">


<h3>
Progress Belajar
</h3>


<br>


Role Akses

<br>

<progress value="100" max="100"></progress>


<br><br>


e-Bupot 21

<br>

<progress 
value="${ebupot.length?50:0}"
max="100">
</progress>


<br><br>


e-Bupot Unifikasi

<br>

<progress value="0" max="100"></progress>


</div>


`;



}







/* =========================
 ROLE ACCESS
========================= */


function rolePage(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
Role Akses
</h1>


<div class="card">


<h3>Main Account</h3>


<p>
ID:
3217122601770007
</p>


<p>
Nama:
Mahasiswa UNY
</p>


<hr>


<h3>
Taxpayer Account
</h3>


<p>
0012345678910000
</p>


<p>
UNY Tax Laboratory
</p>


<button
onclick="impersonate()"
class="btn-login">

Masuk sebagai Taxpayer

</button>


</div>

`;



}




function impersonate(){


let role={


id:"0012345678910000",

name:"UNY Tax Laboratory",

active:true


};



saveData(
STORAGE.role,
role
);



addActivity(
"Impersonating UNY Tax Laboratory"
);



alert(
"You are currently impersonating user:\nUNY Tax Laboratory"
);



}






/* =========================
 E-BUPOT 21
========================= */


function ebupot21Page(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
e-Bupot 21
</h1>


<div class="card">


<p>
Mahasiswa memahami proses pembuatan bukti pemotongan PPh Pasal 21.
</p>


<button
onclick="showEBupotForm()"
class="btn-login">

+ Create eBupot MP

</button>


<br><br>


<table>

<thead>

<tr>

<th>
Tax Period
</th>

<th>
TIN
</th>

<th>
Nama
</th>

<th>
PPh
</th>

<th>
Status
</th>

</tr>

</thead>


<tbody id="ebupotTable">

</tbody>


</table>


</div>

`;



renderEBupot();



}




function showEBupotForm(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
Create e-Bupot MP
</h1>


<div class="form-section">


<h3>
General Information
</h3>


<div class="form-grid">


<input id="taxPeriod"
placeholder="Tax Period">


<input id="tin"
placeholder="TIN">


<input id="empName"
placeholder="Name">


<input id="position"
placeholder="Position">


</div>

</div>



<div class="form-section">


<h3>
Income
</h3>


<div class="form-grid">


<input
id="income"
type="number"
placeholder="Penghasilan Bruto"
oninput="calculateTax()">



<input
id="rate"
readonly
placeholder="Rate">


<input
id="tax"
readonly
placeholder="PPh Dipotong">


</div>


</div>


<button
onclick="saveDraft21('Draft')"
class="btn-login">

Save Draft

</button>


<button
onclick="saveDraft21('Submitted')"
class="btn-login">

Submit

</button>


`;



}




function calculateTax(){


let income =
Number(
document.getElementById("income").value
)||0;



let tax =
income*1/100;



document.getElementById("rate").value="1%";


document.getElementById("tax").value=tax;



}






function saveDraft21(status){


let data =
getData(
STORAGE.ebupot21
);



data.push({


taxPeriod:
taxPeriod.value,


tin:
tin.value,


name:
empName.value,


income:
income.value,


tax:
tax.value,


status:status


});



saveData(
STORAGE.ebupot21,
data
);



addActivity(
status+" e-Bupot 21"
);



alert(
"Data berhasil disimpan"
);



ebupot21Page();



}




function renderEBupot(){


let table =
document.getElementById(
"ebupotTable"
);



if(!table)return;



let data =
getData(
STORAGE.ebupot21
);



table.innerHTML="";



data.forEach(x=>{


table.innerHTML+=`

<tr>

<td>${x.taxPeriod}</td>

<td>${x.tin}</td>

<td>${x.name}</td>

<td>${x.tax}</td>

<td>${x.status}</td>

</tr>

`;


});


}






/* =========================
 UNIFIKASI
========================= */


function unifikasiPage(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
e-Bupot Unifikasi
</h1>


<div class="card">


<p>
Simulasi BPPU, PPh Pasal 23 dan PPh Pasal 4 Ayat 2.
</p>


<button class="btn-login">

Create eBUPOT BPU

</button>


</div>

`;



}






/* =========================
 SPT
========================= */


function sptPage(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
SPT Masa Unifikasi
</h1>


<div class="card">


<h3>
Workflow Simulasi
</h3>


<p>
1. Buat Konsep SPT
</p>


<p>
2. Pilih PPh Unifikasi
</p>


<p>
3. Pilih Periode Pajak
</p>


<p>
4. Generate SPT
</p>


</div>

`;



}






function documentPage(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
Dokumen Saya
</h1>


<div class="card">

Belum ada dokumen.

</div>


`;

}




function progressPage(){


document.getElementById(
"contentArea"
).innerHTML=`

<h1>
Progress Belajar
</h1>


<div class="card">

Role Akses : 100%

<br><br>

e-Bupot 21 : 50%

<br><br>

e-Bupot Unifikasi : 0%

</div>

`;

}





/* =========================
 EXPORT
========================= */


function exportData(){


let output={};



Object.keys(localStorage)
.forEach(key=>{


output[key]=
localStorage.getItem(key);


});



let blob =
new Blob(

[
JSON.stringify(output,null,2)
],

{
type:"application/json"
}

);



let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"edutax-simulation.json";


link.click();



}





/* =========================
 IMPORT
========================= */


function importData(event){


let file =
event.target.files[0];


let reader =
new FileReader();



reader.onload=function(){


let data =
JSON.parse(
reader.result
);



Object.keys(data)
.forEach(key=>{


localStorage.setItem(
key,
data[key]
);


});


alert(
"Import berhasil"
);


location.reload();


};



reader.readAsText(file);


}






/* =========================
 RESET
========================= */


function resetData(){


if(confirm(
"Hapus semua data simulasi?"
)){


localStorage.clear();


location.reload();


}


}





/* =========================
 DARK MODE
========================= */


function darkMode(){


document.body.classList.toggle(
"dark"
);


}