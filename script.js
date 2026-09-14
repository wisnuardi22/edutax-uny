* {
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:"Poppins",sans-serif;
}

body {
    min-height:100vh;
    background:#eef2f7;
}

.hidden {
    display:none;
}


/* LOGIN */

#login-view {
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}


.login-card {

    width:1040px;
    height:740px;

    display:flex;

    background:white;

    border-radius:10px;

    overflow:hidden;

    box-shadow:
    0 20px 50px rgba(0,0,0,.15);
}


/* LEFT */

.login-left {

    width:54%;

    padding:40px;

    background:white;
}


.login-logo img {

    width:70px;

    margin-bottom:20px;
}


.login-title h1 {

    font-size:26px;

    color:#12264f;

}


.login-title p {

    margin-top:5px;

    color:#6842d8;

    font-size:13px;

    font-weight:600;

}


.field {

    margin-top:18px;

}


.field label {

    display:block;

    font-size:13px;

    color:#23385d;

    margin-bottom:7px;

}


.field input,
.field select {

    width:100%;

    height:43px;

    border:1px solid #ccd5e0;

    border-radius:5px;

    padding:0 14px;

    font-size:14px;

}


.password-field {

    display:flex;

}


.password-field input {

    border-radius:5px 0 0 5px;

}


.password-field button {

    width:45px;

    background:white;

    border:1px solid #ccd5e0;

}


.captcha-row {

    display:flex;

    gap:10px;

}


.captcha-box {

    width:140px;

    height:42px;

    background:#e7edf5;

    display:flex;

    justify-content:center;

    align-items:center;

    letter-spacing:5px;

    font-weight:600;

}


.refresh {

    width:42px;

    border:1px solid #ccd5e0;

    background:white;

}


.captcha-row input {

    flex:1;

}


.forgot {

    display:block;

    margin-top:15px;

    color:#006cff;

    font-size:13px;

}


.login-button {

    width:100%;

    height:52px;

    margin-top:20px;

    background:#ffc928;

    border:none;

    border-radius:5px;

    font-size:16px;

    font-weight:600;

    color:#12264f;

}


.register {

    text-align:center;

    margin-top:18px;

    font-size:13px;

}


.register a {

    display:inline-block;

    color:#006cff;

    margin-left:5px;

}


.register a:last-child {

    display:block;

}


.demo-box {

    margin-top:20px;

    padding:15px;

    border:1px solid #9bc7ff;

    background:#edf7ff;

    border-radius:5px;

    font-size:12px;

    color:#24527a;

}


/* RIGHT */

.login-right {

    width:46%;

    background:#071d45;

    position:relative;

    overflow:hidden;

    color:white;

}


.login-right:before {

    content:"";

    position:absolute;

    inset:0;

    background-image:
    linear-gradient(
        rgba(255,255,255,.07) 1px,
        transparent 1px
    ),
    linear-gradient(
        90deg,
        rgba(255,255,255,.07) 1px,
        transparent 1px
    );

    background-size:40px 40px;

}


.right-content {

    position:relative;

    z-index:2;

    padding:40px;

}


.badge {

    display:inline-block;

    padding:7px 15px;

    border:1px solid rgba(255,255,255,.3);

    border-radius:20px;

    font-size:12px;

    color:#ffc928;

}


.right-content h1 {

    margin-top:35px;

    font-size:44px;

}


.right-content h2 {

    margin-top:5px;

    font-size:34px;

    line-height:1.2;

}


.yellow-line {

    width:130px;

    height:7px;

    background:#ffc928;

    border-radius:10px;

    margin-top:25px;

}


.right-content p {

    margin-top:25px;

    width:280px;

    font-size:14px;

    line-height:1.6;

}


.uny-footer {

    position:absolute;

    bottom:-560px;

    display:flex;

    align-items:center;

    gap:15px;

}


.uny-footer img {

    width:55px;

}


.uny-footer span {

    font-size:12px;

    letter-spacing:2px;

}



/* RESPONSIVE */

@media(max-width:1100px){

    .login-card {
        width:95%;
    }

}


@media(max-width:800px){

    .login-card {
        height:auto;
        flex-direction:column;
    }

    .login-left,
    .login-right {
        width:100%;
    }

}