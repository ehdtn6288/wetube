const headerMenuBtn = document.getElementById("headerMenu");
const headerOptions = document.getElementById("headerOptions");
const headerMenuExit = document.getElementById("headerMenuExit");
const headerBgWrap = document.getElementById("bgWrap");
const headerSearchInput = document.getElementById("headerSearchInput");
const headerSearchBtn = document.getElementById("searchBtn");
const responsiveWidth = window.matchMedia("screen and (max-width: 768px)");

function openMenuHandler() {
  console.log("open " + headerOptions.style.display);
  headerBgWrap.style.display = "block";
  headerOptions.style.display = "block";
  setTimeout(() => {
    headerBgWrap.style.opacity = 1;
    headerOptions.style.opacity = 1;
  }, 10);
}

function exitMenuHandler() {
  headerBgWrap.style.opacity = 0;
  headerOptions.style.opacity = 0;
  setTimeout(() => {
    headerBgWrap.style.display = "none";
    headerOptions.style.display = "none";
  }, 500);
  console.log("exit " + headerOptions.style.display);
}

function handleSearchInput() {
  if (!responsiveWidth.matches) {
    headerSearchInput.style.width = "300px";
    headerSearchInput.addEventListener("blur", decreaseInputWidth);
  } else {
    headerSearchInput.style.width = "150px";
    // headerSearchInput.addEventListener("blur", decreaseInputWidth2);
  }
}
function decreaseInputWidth2() {
  if (headerSearchInput.value == "") {
    //input 안에 값이 있으면, focusout 되어도 input 창이 작아지지 않게 하기
    // 검색창에 검색할 단어가 있으면, focus 벚어나도, 검색창이 줄어들지 않게 하기 !!
    console.log(headerSearchInput.value == "");
    headerSearchInput.style.width = "150px";
  } else {
    return;
  }
}
function decreaseInputWidth() {
  if (headerSearchInput.value == "") {
    //input 안에 값이 있으면, focusout 되어도 input 창이 작아지지 않게 하기
    // 검색창에 검색할 단어가 있으면, focus 벚어나도, 검색창이 줄어들지 않게 하기 !!
    console.log(headerSearchInput.value == "");
    headerSearchInput.style.width = "200px";
  } else {
    return;
  }
}
function handleSerchResponse() {
  headerSearchInput.style.width = "150px";
}
function init() {
  headerMenuExit.onclick = exitMenuHandler;
  headerMenuBtn.onclick = openMenuHandler;
  headerBgWrap.onclick = exitMenuHandler;
  headerSearchInput.onclick = handleSearchInput;
  responsiveWidth.addEventListener("change", handleSerchResponse);
}

if (headerMenuBtn) {
  init();
}
