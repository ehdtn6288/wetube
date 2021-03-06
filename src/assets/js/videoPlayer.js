import getBlobDuration from "get-blob-duration";
const videoContainer = document.getElementById("jsVideoContainer");
const videoPlayer = document.getElementById("my-video");
const videoPlayBtn = document.getElementById("jsVideoPlayBtn");
const videoPlayRange = document.getElementById("jsVideoPlayRange");
const videoVolumeBox = document.getElementById("volumeBox");
const videoVolumeBtn = document.getElementById("jsVideoVolumeBtn");
const videoVolumeRange = document.getElementById("jsVolumbRange");
const videoVolumeRangeWrapper = document.getElementById("jsVolumneRageWrapper");
const videoFullBtn = document.getElementById("jsVideoFullscreenBtn");
const videoCurrentTime = document.getElementById("currentTime");
const videoTotalTime = document.getElementById("totalTime");
const videoControlBox = document.getElementById("jsVideoControlBox");
const inputRange = document.querySelectorAll("input[type=range]");

function increaseViews() {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/views`, { method: "POST" });
  const videoViews = document.getElementById("jsVideoViews");
  videoViews.innerHTML = parseInt(videoViews.innerHTML) + 1;
}
function handlePlayPause() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;

    videoControlBox.style.opacity = "0";
  } else {
    videoPlayer.pause();
    videoPlayBtn.innerHTML = `<i class = "fas fa-play"></i>`;
    videoControlBox.style.opacity = "1";
    clearInterval(hideMouse);
  }
}
function handleMute() {
  if (videoPlayer.muted) {
    videoVolumeRange.value = videoPlayer.volume;
    // videoVolumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    formatVolume(videoPlayer.volume);
    videoPlayer.muted = false;
  } else {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    videoPlayer.muted = true;
    videoVolumeRange.value = 0;
  }
}
function handleEnded() {
  videoPlayBtn.innerHTML = `<i class = "fas fa-play"></i>`;
  increaseViews();
}
function outFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  videoFullBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  videoFullBtn.removeEventListener("click", outFullscreen);
  videoFullBtn.addEventListener("click", goFullscreen);
}
function goFullscreen() {
  videoContainer.requestFullscreen();
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    /* Firefox */
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    /* IE/Edge */
    videoContainer.msRequestFullscreen();
  }
  videoFullBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  videoFullBtn.removeEventListener("click", goFullscreen);
  videoFullBtn.addEventListener("click", outFullscreen);
}
function handleDuration() {
  // const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  // const reader = new FileReader();
  // console.log(reader.readAsDataURL(videoPlayer.src.blob));
  // const durtaion = await getBlobDuration(blob); //blob 파일 비디오 재생시간 오류 해결
  const videoDuration = videoPlayer.duration;
  videoTotalTime.innerHTML = formatData(videoDuration);
  videoCurrentTime.innerHTML = formatData(Math.round(videoPlayer.currentTime));
  videoPlayRange.max = Math.floor(videoDuration) - 0.5;
  setInterval(getCurrentTime, 500); //시간 표시 단위를 짧게 해서, 영상이 끝나도 현재시간이 1초 작게 나오는것을 방지
}
function getCurrentTime() {
  if (!videoPlayer.paused) {
    videoCurrentTime.innerHTML = formatData(
      Math.round(videoPlayer.currentTime)
    );
    // console.log("표시 시간 : " + Math.floor(videoPlayer.currentTime));
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

  return hours !== "00"
    ? `${hours}:${mins}:${totaleSeconds}`
    : `${mins}:${totaleSeconds}`;
}
function handleVolume(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  formatVolume(value);
}
function formatVolume(value) {
  if (value >= 0.7) {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value >= 0.2) {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
}
function handlePlay(e) {
  videoPlayer.currentTime = videoPlayRange.value;
  videoCurrentTime.innerHTML = formatData(videoPlayRange.value); // 바뀐 재생지점 표시해주기
  const {
    target: { value: val },
  } = e;
  console.log("dkjfskflskjflskfjsldkjfsdlkj");
  videoPlayRange.style.background =
    "linear-gradient(to right, red, dodgerblue " +
    val +
    "%, #d5d4d3 " +
    val +
    "%, #d5d4d3 100%";
  // console.log("range : " + videoPlayRange.value);
  // console.log("재생시간 : " + videoPlayer.currentTime);
}
function setCurrentRange() {
  if (!videoPlayer.paused) {
    videoPlayRange.value = videoPlayer.currentTime;
    // !! videoPlayRnage.value 의 값은 1단위 이며, 대입값이 소수점인 경우 반올림되어진다.
    // / 그래서 계속 rnage값이 변동하는 불상사가 생겼던것
    // console.log("현재시간 : " + videoPlayer.currentTime);
    // console.log("range : " + videoPlayRange.value);
  }
}
const getVideoDuration = () => {
  videoPlayer.addEventListener("loadedmetadata", handleDuration);
};
const handleControlsBox = () => {
  videoControlBox.style.opacity = "1";

  videoPlayer.addEventListener("mousemove", handleMouseHide);
  videoPlayer.addEventListener("mouseleave", () => {
    if (!videoPlayer.paused) {
      videoControlBox.style.opacity = "0";
    }
  });
};
const handleControlsBox2 = () => {
  videoControlBox.style.cursor = "default";
  videoControlBox.style.opacity = "1";

  videoControlBox.addEventListener("mouseleave", () => {
    if (!videoPlayer.paused) {
      videoControlBox.style.opacity = "0";
    }
  });
};

let hideMouse;
const handleMouseHide = () => {
  clearInterval(hideMouse);
  videoPlayer.style.cursor = "default";
  videoControlBox.style.opacity = "1";
  videoPlayer.addEventListener("mouseleave", () => clearInterval(hideMouse));
  if (!videoPlayer.paused) {
    hideMouse = setInterval(() => {
      videoPlayer.style.cursor = "none";
      videoControlBox.style.opacity = "0";
    }, 3000);
  }
};

const playWithSpace = (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    handlePlayPause();
  }
};
const handleVideoJsFull = () => {
  console.log(videoPlayer.classList.value.includes("video-js"));
  if (videoPlayer.classList.value.includes("video-js")) {
    videoPlayer.classList.remove("video-js"); // 전체화면이 될때만 video-js 를 업애준다. 그래야 video-js 의 이상한 css 의 적용을 받지 않음.
  } else {
    videoPlayer.classList.add("video-js");
    videoFullBtn.innerHTML = `<i class="fas fa-expand"></i>`;
    videoFullBtn.removeEventListener("click", outFullscreen);
    videoFullBtn.addEventListener("click", goFullscreen);
  }
};
const showVolumeRange = () => {
  videoVolumeBtn.style.width = `25px`;
  videoVolumeRangeWrapper.style.width = `80px`;
  videoVolumeBox.style.backgroundColor = "rgba(255, 255, 255, 0.153)";
};
const hideVolumeRange = () => {
  videoVolumeBtn.style.width = `initial`;
  videoVolumeRangeWrapper.style.width = `0`;
  videoVolumeBox.style.backgroundColor = "transparent";
};
const handlePcMobilePlay = () => {
  if (clickEvent() === "touchstart") {
    videoControlBox.style.opacity = "1";
    console.log(clickEvent() === "touchstart");
    videoPlayer.removeEventListener(clickEvent(), handlePcMobilePlay);
  } else {
    console.log(clickEvent() === "touchstart");
    handlePlayPause();
  }
};
const clickEvent = () => {
  if ("ontouchstart" in document.documentElement === true) {
    return "touchstart";
  } else {
    return "click";
  }
};
const handleScreenControls = () => {
  if (window.innerWidth > 768) {
    videoControlBox.style.display = "flex";
    // videoPlayer.controls = "false";
  } else {
    videoControlBox.style.display = "none";
    videoPlayer.controls = "true";
  }
};
function init() {
  videoPlayRange.value = videoPlayer.currentTime;

  // videoPlayRange.value = 0;
  videoPlayRange.step = 0.01;
  videoVolumeRange.step = 0.01;
  videoPlayer.volume = 0.5; //초기 비디오 오디오 값을 설정해 준다.

  setInterval(setCurrentRange, 50);
  videoPlayer.addEventListener("mouseover", handleControlsBox);
  videoControlBox.addEventListener("mouseover", handleControlsBox2);

  // videoPlayer.addEventListener("click", handlePlayPause);
  videoPlayBtn.addEventListener("click", handlePlayPause);
  videoVolumeBtn.addEventListener("click", handleMute);
  videoVolumeBox.addEventListener("mouseover", showVolumeRange);
  videoVolumeBox.addEventListener("mouseleave", hideVolumeRange);
  videoFullBtn.addEventListener("click", goFullscreen);
  videoPlayer.load(getVideoDuration()); // loadeddata 이벤트가 호출되지 않는 문제 발생!! 그래서, 비디오가 로드 되면 함수로써 이벤트 리스너 실행하도록 설정.
  videoPlayer.addEventListener("ended", handleEnded);
  videoVolumeRange.addEventListener("input", handleVolume);
  videoPlayRange.addEventListener("input", handlePlay);
  window.addEventListener("keydown", playWithSpace);
  document.addEventListener("fullscreenchange", handleVideoJsFull);
  videoPlayer.addEventListener(clickEvent(), handlePcMobilePlay);
  // window.addEventListener("resize", handleScreenControls);
}

if (videoContainer) {
  if (window.innerWidth > 768) {
    init();
  } else {
    videoControlBox.style.display = "none";
    videoPlayer.controls = "true";
  }
}
