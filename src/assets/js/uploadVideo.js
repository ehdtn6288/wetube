const videoInput = document.getElementById("file");
const video = document.getElementById("my-video");
const inputDuration = document.querySelector("input[name=duration]");
const fileUploadContainer = document.getElementById("fileUploadContainer");
const source = document.getElementById("jsVideoSource");
const videoPlayerContainer = document.getElementById("jsVideoContainer");

const setPriview = () => {
  console.log(videoInput.files);
  const file = videoInput.files[0];
  const fileName = document.getElementById("jsFileName");
  const fileSize = document.getElementById("jsFileSize");
  const fileType = document.getElementById("jsFileType");
  const fileLabel = document.getElementById("jsUploadLabel");
  const filePreiviewContainer = document.getElementById("fileUploadContainer");
  const reader = new FileReader();
  // const blobUrl = URL.createObjectURL(file);
  reader.addEventListener("loadend", function () {
    video.src = reader.result; //일단 접어두기
    video.type = file.type;
    source.src = reader.result;
    // console.log(window.atob(`${reader.result.split(",")[1]}`));
    // console.log(video.children[0].src);
    fileName.innerHTML = "파일이름 : " + file.name;
    fileSize.innerHTML = "파일크기 : " + returnFileSize(file.size);
    fileType.innerHTML = "파일타입 : " + file.type;

    videoPlayerContainer.style.transition = "1s linear";
    filePreiviewContainer.style.boxShadow = "none";
    requestAnimationFrame(() =>
      setTimeout(() => {
        videoPlayerContainer.style.opacity = 1;
        fileLabel.style.opacity = 0;
      })
    );
  });

  if (file) {
    reader.readAsDataURL(file);
  } else {
    video.src = "";
    inputDuration.value = "";
    fileName.innerHTML = "파일정보";
    fileSize.innerHTML = "";
    fileType.innerHTML = "";

    videoPlayerContainer.style.transition = ".5s linear";
    requestAnimationFrame(() =>
      setTimeout(() => {
        videoPlayerContainer.style.opacity = 0;
        fileLabel.style.opacity = 1;
        filePreiviewContainer.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.281),
        0 10px 20px rgba(0, 0, 0, 0.192)`;
      })
    );
  }
};

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}

function formatData(seconds) {
  const secondNum = parseInt(seconds, 10);
  let hours = Math.floor(secondNum / 3600);
  let mins = Math.floor((secondNum - hours * 3600) / 60);
  let totaleSeconds = secondNum - hours * 3600 - mins * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (totaleSeconds < 10) {
    totaleSeconds = `0${totaleSeconds}`;
  }

  return `${hours}:${mins}:${totaleSeconds} `;
}
function setDurtaion() {
  console.log(video.duration);
  inputDuration.value = formatData(video.duration);
}

function init() {
  videoInput.addEventListener("change", setPriview);
  video.addEventListener("loadedmetadata", setDurtaion);
  // videoInput.oninput = showDuration;
  console.log(video);
}

if (videoInput) {
  init();
}
