const globe = document.querySelector(".globe");
const setting = document.querySelector(".lang-setting");
const langs = document.querySelectorAll(".langs");
const body = document.querySelector("body");
setting.style.display = "none";

function showLangs() {
    if (setting.style.display == "none") {
        setting.style.display = "block";
        setting.style.animation = "open-settings 0.2s ease";
    } else if (setting.style.display == "block") {
        setTimeout(none, 200);
        setting.style.animation = "close-settings 0.2s ease";
    }
}

function closeSettings(e) {
    if (e.target == body && setting.style.display == "block") {
        setTimeout(none, 200);
        setting.style.animation = "close-settings 0.2s ease";
    }
}

function none() {
    setting.style.display = "none";
}

function clickLangs(e) {
    if (e.path[0].innerText == "English") {
        changeLangs("eng");
    } else if (e.path[0].innerText == "한국어") {
        changeLangs("kor");
    } else if (e.path[0].innerText == "日本語") {
        changeLangs("jpn");
    } else {
        changeLangs("zh");
    }
}

function changeLangs(lang) {
    const h1 = document.querySelector("h1");
    const h3 = document.querySelector("h3");
    const ph = document.querySelectorAll(".placeholder");
    const chkBox = document.querySelector(".checkbox");
    const a = document.querySelectorAll("a");
    console.log(chkBox.innerText);
    const head = '<input type="checkbox" /><div class="fas fa-check"></div>';

    if (lang == "eng") {
        h1.innerText = "Sign In";
        ph[0].innerText = "USERNAME";
        ph[1].innerText = "PASSWORd";
        chkBox.innerHTML = head + "Stay signed in";
        a[0].innerText = "CAN'T SIGN IN?";
        a[1].innerText = "CREATE ACCOUNT";
    } else if (lang == "kor") {
        h1.innerText = "로그인";
        ph[0].innerText = "아이디";
        ph[1].innerText = "비밀번호";
        chkBox.innerHTML = head + "로그인 상태 유지";
        a[0].innerText = "로그인이 안 되시나요?";
        a[1].innerText = "계정 생성하기";
    } else if (lang == "jpn") {
        h1.innerText = "サインイン";
        ph[0].innerText = "ユーザー名";
        ph[1].innerText = "パスワード";
        chkBox.innerHTML = head + "サインイン状態を維持";
        a[0].innerText = "サインインできませんか？";
        a[1].innerText = "アカウントを作成";
    } else if (lang == "zh") {
        h1.innerText = "登入";
        ph[0].innerText = "使用者名稱";
        ph[1].innerText = "密码";
        chkBox.innerHTML = head + "保持登入狀態";
        a[0].innerText = "無法登入嗎？";
        a[1].innerText = "建立帳號";
    }
}

globe.addEventListener("click", showLangs);
langs[0].addEventListener("click", clickLangs);
langs[1].addEventListener("click", clickLangs);
langs[2].addEventListener("click", clickLangs);
langs[3].addEventListener("click", clickLangs);
document.querySelector("html").addEventListener("click", closeSettings);
