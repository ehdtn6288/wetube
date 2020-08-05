import getBlobDuration from "get-blob-duration";
const videoContainer = document.getElementById("jsVideoContainer");
const videoPlayer = document.getElementById("jsVideoPlayer");
const videoPlayBtn = document.getElementById("jsVideoPlayBtn");
const videoPlayRange = document.getElementById("jsVideoPlayRange");
const videoVolumeBtn = document.getElementById("jsVideoVolumeBtn");
const videoVolumeRange = document.getElementById("jsVolumbRange");
const videoFullBtn = document.getElementById("jsVideoFullscreenBtn");
const videoCurrentTime = document.getElementById("currentTime");
const videoTotalTime = document.getElementById("totalTime");

function increaseViews() {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/views`, { method: "POST" });
  const videoViews = document.getElementById("jsVideoViews");
  videoViews.innerHTML = parseInt(videoViews.innerHTML) + 1;
}

function handlePlayPause() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayRange.value = videoPlayer.currentTime;
    videoPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    videoPlayBtn.innerHTML = `<i class = "fas fa-play"></i>`;
  }
}
function handleMute() {
  if (videoPlayer.muted) {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    videoPlayer.muted = false;
    videoVolumeRange.value = videoPlayer.volume;
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
function exitFullscreen() {
  document.exitFullscreen();
  videoFullBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  videoFullBtn.removeEventListener("click", exitFullscreen);
  videoFullBtn.addEventListener("click", goFullscreen);
}
function goFullscreen() {
  videoContainer.requestFullscreen();
  videoFullBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  videoFullBtn.removeEventListener("click", goFullscreen);
  videoFullBtn.addEventListener("click", exitFullscreen);
  // console.log(videoPlayer);
}
async function handleDuration() {
  const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  const durtaion = await getBlobDuration(blob); //blob 파일 비디오 재생시간 오류 해결
  const videoDuration = videoPlayer.duration;
  videoTotalTime.innerHTML = formatData(durtaion);
  videoPlayRange.max = Math.floor(durtaion) - 0.5;
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

  return `${hours}:${mins}:${totaleSeconds} `;
}

function handleVolume(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value >= 0.2) {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    videoVolumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
}

function handlePlay(event) {
  videoPlayer.currentTime = videoPlayRange.value;
  videoCurrentTime.innerHTML = formatData(videoPlayRange.value); // 바뀐 재생지점 표시해주기
  // console.log("range : " + videoPlayRange.value);
  // console.log("재생시간 : " + videoPlayer.currentTime);
}
function setCurrentRange() {
  if (!videoPlayer.paused) {
    videoPlayRange.value = videoPlayer.currentTime;
    //!! videoPlayRnage.value 의 값은 1단위 이며, 대입값이 소수점인 경우 반올림되어진다.
    /// 그래서 계속 rnage값이 변동하는 불상사가 생겼던것
    // console.log("현재시간 : " + videoPlayer.currentTime);
    // console.log("range : " + videoPlayRange.value);
  }
}
const getVideoDuration = () => {
  videoPlayer.addEventListener("loadedmetadata", handleDuration);
};
function init() {
  videoPlayRange.value = 0;
  videoPlayRange.step = 0.01;
  videoPlayer.volume = 0.5; //초기 비디오 오디오 값을 설정해 준다.

  setInterval(setCurrentRange, 50);

  videoPlayBtn.addEventListener("click", handlePlayPause);
  videoVolumeBtn.addEventListener("click", handleMute);
  videoFullBtn.addEventListener("click", goFullscreen);
  videoPlayer.load(getVideoDuration()); // loadeddata 이벤트가 호출되지 않는 문제 발생!! 그래서, 비디오가 로드 되면 함수로써 이벤트 리스너 실행하도록 설정.
  videoPlayer.addEventListener("ended", handleEnded);
  videoVolumeRange.addEventListener("input", handleVolume);
  videoPlayRange.addEventListener("input", handlePlay);
}

if (videoContainer) {
  init();
}
