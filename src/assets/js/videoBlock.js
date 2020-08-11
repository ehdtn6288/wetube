const videoBlock = document.getElementsByClassName("videoBlock");
const dateDif = document.getElementsByClassName("dateDif");

const formatDate = (date) => {
  let difMilliSeconds = Date.now() - new Date(date);
  let difTotalSeconds = difMilliSeconds / 1000;
  let difYears = Math.floor(difTotalSeconds / 31536000);
  let difMonths = Math.floor((difTotalSeconds - difYears * 31536000) / 2772000);
  let difDays = Math.floor(
    (difTotalSeconds - difYears * 31536000 - difMonths * 2772000) / 86400
  );
  let difHours = Math.floor(
    (difTotalSeconds -
      difYears * 31536000 -
      difMonths * 2772000 -
      difDays * 86400) /
      3600
  );
  let difMins = Math.floor(
    (difTotalSeconds -
      difYears * 31536000 -
      difMonths * 2772000 -
      difDays * 86400 -
      difHours * 3600) /
      60
  );
  let difSeconds = Math.floor(
    difTotalSeconds -
      difYears * 31536000 -
      difMonths * 2772000 -
      difDays * 86400 -
      difHours * 3600 -
      difMins * 60
  );
  console.log(difYears, difMonths, difDays, difHours, difMins, difSeconds);
  if (difYears > 0) {
    return `${difYears}년 전`;
  }
  if (difMonths > 0) {
    return `${difMonths}개월 전`;
  }
  if (difDays > 0) {
    return `${difDays}일 전`;
  }
  if (difHours > 0) {
    return `${difHours}시간 전`;
  }
  if (difMins > 0) {
    return `${difMins}분 전`;
  }
  if (difSeconds < 10) {
    return "방금 전";
  }
  if (difSeconds < 60) {
    return `${difSeconds}초 전`;
  }
};

function init() {
  //   dateDif.innerHTML = formatDate(dateDif.innerHTML);
  const blockNum = videoBlock.length;
  for (var i = 0; i < blockNum; i++) {
    dateDif[i].innerHTML = formatDate(dateDif[i].innerHTML);
    console.log("1111" + dateDif[i].innerHTML);
  }
}

if (videoBlock) {
  init();
}
