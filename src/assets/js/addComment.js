import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentsList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");
const commentAvatar = document.getElementById("jsCommentAvatar");

// function decreaseCommentNum(thisSubNum) {
//   console.log(thisSubNum);
//   commentNum.innerHTML = parseInt(commentNum.innerHTML) - thisSubNum - 1; //subComment - 자기자신도 1개 빼야 되므로
//   originalCommentNum -= 1;
// }

const addComment = (
  commentText,
  commentId,
  commentCreatorId,
  userId,
  userAvatar,
  userName,
  commentDate,
  commentsList,
  subCommentNum,
  videoCreatorId
) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  const contentBox = document.createElement("div");
  const avatar = document.createElement("img");
  const name = document.createElement("span");
  const dateBox = document.createElement("div");
  const date = document.createElement("span");
  const time = document.createElement("span");
  const imgLink = document.createElement("a");
  const commentBox = document.createElement("div");

  //프로필 사진 이미지 태그를 a 태그안에 추가시키고, a 태그는 comment.creator.id 값을 통해 해당 유저의 프로필로 가게끔 링크(href)를 건다.
  commentBox.classList.add("comment-box");

  avatar.src = userAvatar;
  avatar.classList.add("comment-user__avatar");
  imgLink.href = `${
    window.location.href.split("videos")[0]
  }users/${commentCreatorId}`; // 배포하면 localhost:4000이 아닌 도메인 주소를 가지므로, 홈페이지 메인 도메인 주소를 뽑아서, 뒤에다 users/:id 값을 붙여줘야 한다.
  imgLink.appendChild(avatar);
  commentBox.appendChild(imgLink);

  name.innerHTML = userName;
  span.innerHTML = commentText;
  name.classList.add("comment-user__name");
  span.classList.add("comment__text");
  contentBox.classList.add("comment__contnet-box");
  contentBox.appendChild(name);
  contentBox.appendChild(span); // li 안에 span 이 들어간 형태(노드)만 만들어 줌.
  commentBox.appendChild(contentBox);

  // const getDate = commentDate.slice(0, 10);
  // const getTime = commentDate.slice(11, 19);
  const ymd = new Date(commentDate).toLocaleString().split(" ").slice(0, 3);
  const commentTime = new Date(commentDate)
    .toLocaleString()
    .split(" ")
    .slice(3, 5);
  date.innerHTML = formatDate(commentDate);
  time.innerHTML = `${formatDate2(commentDate)[0]}  \  ${
    formatDate2(commentDate)[1]
  }`; // 역슬레쉬는 줄바꿈!!

  dateBox.classList.add("comment__date-box");
  dateBox.appendChild(date);
  dateBox.appendChild(time);
  commentBox.appendChild(dateBox);

  li.id = commentId;
  commentsList.appendChild(li); // .prepend or .append 를 통해 만들어진 노드를 삽입
  /// js 에서 스타일 정의하고, transition 주기

  li.style.opacity = 0;
  li.style.transition = "0.7s linear";
  requestAnimationFrame(() =>
    setTimeout(() => {
      li.style.opacity = 1;
    })
  );

  const subCommentBtn = document.createElement("span");
  const subNum = document.createElement("span");
  const optionBox = document.createElement("div");

  if (userId) {
    subCommentBtn.className = commentId;
    subCommentBtn.classList.add("comment__subComment-btn");
    subCommentBtn.innerHTML = `답글 ${
      subCommentNum == 0 ? "달기" : subCommentNum
    }`;

    subNum.innerHTML = subCommentNum;
    subNum.classList.add("comment__num");
    subNum.style.display = "none";

    optionBox.classList.add("comment__option-box");
    optionBox.appendChild(subCommentBtn);
    optionBox.appendChild(subNum);

    subCommentBtn.addEventListener("click", handleSubComment);
    commentBox.appendChild(optionBox);
  }

  if (commentCreatorId === userId) {
    // 본인이 로그인 했을때만, 삭제표시 해주기
    delBtn.className = commentId;
    delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    delBtn.classList.add("comment__delete-btn");
    optionBox.appendChild(delBtn);
    delBtn.addEventListener(clickEvent, handleDelete);
  }
  if (videoCreatorId === commentCreatorId) {
    li.style.backgroundColor = "rgba(189, 53, 53, 0.042)";
  }
  li.appendChild(commentBox);
};

let clickEvent = (function () {
  if ("ontouchstart" in document.documentElement === true) return "touchstart";
  else return "click";
})();
// 업로드 한지 시간이 얼마나 흘렀는지 알려주는 함수
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

const formatDate2 = (date) => {
  const dateString = new Date(date);
  const year = dateString.getFullYear();
  const month = dateString.getMonth();
  const day = dateString.getDate();
  const hours =
    dateString.getHours() < 10
      ? `0${dateString.getHours()}`
      : dateString.getHours();
  const ap = hours < 12 ? "am" : "pm";
  const min = dateString.getMinutes();
  const seconde = dateString.getSeconds();

  const type1 = `${year}. ${month}. ${day}`;
  const type2 = `${hours > 12 ? hours - 12 : hours}:${
    min < 10 ? `0${min}` : min
  }:${seconde < 10 ? `0${seconde}` : seconde} 
  ${ap}`;
  return [type1, type2];
};

const foldSubComment = (event) => {
  console.dir(
    event.composedPath()[3].querySelector(".subComment-box").children.length - 1
  );
  const numberOfSubComments =
    event.composedPath()[3].querySelector(".subComment-box").children.length -
    1; //addComment 함수에서 넘겨주자!
  event.composedPath()[3].querySelector(".subComment-box").remove();

  event.target.removeEventListener(clickEvent, foldSubComment);
  event.target.addEventListener(clickEvent, handleSubComment);
  event.target.innerHTML = `답글 ${
    numberOfSubComments == 0 ? "달기" : numberOfSubComments + "개"
  }`;
};

let originalSubCommentsNum;

const handleSubComment = async (event) => {
  const subCommentBtn = event.target;
  console.log(event.composedPath()[3]);
  console.log(event.composedPath()[3]);
  event.target.innerHTML = "답글 접기";
  event.composedPath()[3].style.display = "block";
  subCommentBtn.removeEventListener("click", handleSubComment);
  subCommentBtn.addEventListener("click", foldSubComment);
  // console.log(event);
  // console.log(event.composedPath()[3]); // Commnet li 태그 --> 이 밑에 답글을 입력하는 input이 뜨게 해야됨.
  const commentId = event.composedPath()[3].id;
  // console.log(event.composedPath()[0].className.split(" ")[0]);
  const subCommentBox = document.createElement("div");
  const li = event.composedPath()[3];
  const avatar = document.createElement("img");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const submintBtn = document.createElement("input");

  avatar.src = commentAvatar.src;
  avatar.className = "subComment__avatar";
  input.placeholder = "Add Subcomments";
  input.className = "subComment__input";
  submintBtn.value = "Add";
  submintBtn.type = "submit";
  submintBtn.className = "comment-input__button";
  form.appendChild(avatar);
  form.appendChild(input);
  form.appendChild(submintBtn);
  form.addEventListener("submit", postSubComment);
  subCommentBox.className = "subComment-box";
  subCommentBox.appendChild(form);
  li.appendChild(subCommentBox);

  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    // console.log("~~!!!!!" + response);
    const comments = response.data.video.comments;
    const VideoSubComments = response.data.video.subComments;
    const videoAllComments = comments.concat(VideoSubComments);
    //!!! 해당 비디오에 있는 일반 댓글과, 대댓글로 달린 댓글들의 배열을 합쳐서, 그중에서 답글이 달리는 타겟이 되는 코멘트를 찾는다.
    // 대댓글의 대댓글이 안달렸던 이유는, 비디오에 달려 있는 일반댓글과 대댓글을 비교하는 구조로 되어있기 때문이다.
    // 즉 대댓글들의 아이디 정보가 있어야, 대댓글에 달리는 대댓글에 대하여 아이디 값을 비교하여 답글을 달수 있다.
    // 따라서, 비디오 모델에 대댓글에 대한 배열을 추가하고, 비디오 정보를 불러와서, 그 비디오에 달려있는 일반 댓글과, 대댓글의 배열을 합쳐서,
    // 내가 대댓글을 달고자 하는 대상이 되는 댓글/대댓글을 찾을 수 있다.
    // console.log(videoAllComments);
    const user = response.data.user;
    const video = response.data.video;
    // console.log(comments);
    for (var i = 0; i < videoAllComments.length; i++) {
      // console.log(comments[i]);
      if (videoAllComments[i]._id == commentId) {
        console.log(videoAllComments[i].subComments);
        console.log(response.data.video);
        originalSubCommentsNum = videoAllComments[i].subComments.length;
        const subCommentsNum = videoAllComments[i].subComments.length;
        const subComments = videoAllComments[i].subComments;
        for (var j = 0; j < subCommentsNum; j++) {
          addComment(
            subComments[j].text,
            subComments[j]._id,
            subComments[j].creator._id,
            user._id,
            `${subComments[j].creator.avatarUrl}`,
            subComments[j].creator.name,
            subComments[j].createdAt,
            subCommentBox,
            subComments[j].subComments.length,
            video.creator._id
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
let totalComments;
const postSubComment = async (event) => {
  event.preventDefault();
  console.log(event.composedPath()[1]);
  console.log(event.target[0].value);
  const subComment = event.target[0].value;
  const commentId = event.composedPath()[2].id;
  const subCommentBox = event.composedPath()[1];
  await sendSubComment(commentId, subComment);
  event.target[0].value = "";
  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    const comments = response.data.video.comments;
    const VideoSubComments = response.data.video.subComments;
    const videoAllComments = comments.concat(VideoSubComments);
    const user = response.data.user;
    const video = response.data.video;
    totalComments = videoAllComments.length;
    setCommentNum(videoAllComments.length); //커맨트 개수 표현
    // console.log(comments);
    for (var i = 0; i < videoAllComments.length; i++) {
      // console.log(comments[i]);
      if (videoAllComments[i]._id == commentId) {
        console.log(videoAllComments[i].subComments.length);
        const subCommentsNum = videoAllComments[i].subComments.length;
        const subComments = videoAllComments[i].subComments;
        console.log(originalSubCommentsNum, subCommentsNum);
        if (originalSubCommentsNum != subCommentsNum) {
          for (var j = originalSubCommentsNum; j < subCommentsNum; j++) {
            console.log(subComments[j]);
            console.log(Date.parse(subComments[j].createdAt));
            console.log(Date.now());
            addComment(
              subComments[j].text,
              subComments[j]._id,
              subComments[j].creator._id,
              user._id,
              `${subComments[j].creator.avatarUrl}`,
              subComments[j].creator.name,
              subComments[j].createdAt,
              subCommentBox,
              subComments[j].subComments.length,
              video.creator._id
            );
          }
          originalSubCommentsNum = subCommentsNum;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (event) => {
  // console.log(event.composedPath()[2].children[1].innerHTML);
  // console.log(event.composedPath()[1].className.split(" ")[0]); //자르고 붙여서 클래스에 등록된 코멘트 id 값을 가져온다.
  // const thisSubNum = parseInt(event.composedPath()[2].children[1].innerHTML);
  event.composedPath()[4].remove();
  const commentId = event.composedPath()[1].className.split(" ")[0];
  // decreaseCommentNum(thisSubNum);
  await removeComment(commentId);

  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios.get(`/api/${videoId}/comments`);
  const comments = response.data.video.comments;
  const VideoSubComments = response.data.video.subComments;
  const videoAllComments = comments.concat(VideoSubComments);
  totalComments = videoAllComments.length;
  console.log(totalComments, originalCommentNum);
  // for (var i = 0; i < videoAllComments.length; i++) {
  //   if (videoAllComments[i]._id == commentId) {
  //     videoAllComments[i];
  //   }
  // }
  if (originalCommentNum != comments.length) {
    originalCommentNum -= 1;
  }
  if (originalSubCommentsNum != VideoSubComments.length) {
    originalSubCommentsNum -= 1;
  }
  setCommentNum(totalComments); //커맨트 개수 표현
};

// const deleteComment = () => {
//   const delBtns = commentsList.getElementsByClassName("comment__delete-btn");
//   for (let i = 0; i < delBtns.length; i++) {
//     delBtns[i].addEventListener("click", () => {
//       console.log("클릭!!");
//     });
//   }
// };

const removeComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(typeof videoId);
  await axios({
    url: `/api/${videoId}/comments`,
    method: "DELETE",
    data: {
      commentId: commentId,
    },
  });
  // console.log(response);
};

const sendSubComment = async (commentId, subComment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/subComments`,
    method: "POST",
    data: {
      commentId,
      subComment,
    },
  });
  // console.log(response);
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comments`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status == 400) {
    // addComment(comment);
    console.log("로그인좀 해라..");
  }
  // console.log(response);
};

let originalCommentNum;
let newCommentNumber;

const setCommentData = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    newCommentNumber = response.data.video.comments.length;
    const comments = response.data.video.comments;
    const VideoSubComments = response.data.video.subComments;
    const videoAllComments = comments.concat(VideoSubComments);
    setCommentNum(videoAllComments.length); // 코멘트 개수 변경 --> 비디오의 서브 코멘트 포함한 전체 댓글 개수
    if (response.data.user) {
      const user = response.data.user;
      const video = response.data.video;
      console.log(video.creator._id);

      // console.log(comments[50].creator.trim(), user._id.trim());
      // console.log(user._id == comments[50].creator);     ~~~~~~~~~!!!!!!! console.log에 존재 하지 않는 값을 넣어도. 오류가 뜬다. ..... 새로 만든 비디오에 커멘트가 50개가 없어서.... 계속 오류가 났는데... 못찾음.... console.log 조심해서 쓰자...
      // console.log(comments[2]);
      if (response.status == 200) {
        if (originalCommentNum != newCommentNumber) {
          for (var i = originalCommentNum; i < newCommentNumber; i++) {
            addComment(
              comments[i].text,
              comments[i]._id,
              comments[i].creator._id,
              user._id,
              `${comments[i].creator.avatarUrl}`,
              comments[i].creator.name,
              comments[i].createdAt,
              commentsList,
              comments[i].subComments.length,
              video.creator._id
            );
          }
          originalCommentNum = newCommentNumber;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getOriginalCommentNum = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    const comments = response.data.video.comments;
    console.log("응답 정보111");
    // console.log(response.data.video.comments);
    // console.log(response.data.video.comments[1].createdAt);
    if (response.data.user) {
      const user = response.data.user;
      const video = response.data.video;

      originalCommentNum = response.data.video.comments.length;
      for (var i = 0; i < originalCommentNum; i++) {
        addComment(
          comments[i].text,
          comments[i]._id,
          comments[i].creator._id,
          user._id,
          `${comments[i].creator.avatarUrl}`,
          comments[i].creator.name,
          comments[i].createdAt,
          commentsList,
          comments[i].subComments.length,
          video.creator._id
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function setCommentNum(number) {
  commentNum.innerHTML = number;

  // console.log(originalCommentNum);
  // 커멘트수를 추가한 뒤, original 값으로 변환
}

async function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  await sendComment(comment);
  /// 이걸 비동기로 처리해주지 않으면, 댓글 입력이 바로 적용되지 않는다. 왜냐하면, 이 함수에서 변경된 comment 정보를 데이터베이스에 수정하기까지 시간이 걸리는데,
  //이것이 완료되기 전에 아래있는 setCommentData()먼저 실행되므로, 비동기 처리하여, 수정이 끝나면 다음 함수가 실행되도록 하자!@!!
  setCommentData();
  commentInput.value = "";
  console.log(comment);
}

async function init() {
  getOriginalCommentNum(); // 시작시점의 코멘트 갯수를 가져온다.

  // setInterval(setCommentData, 10000); // 이걸 키면 실시간으로 댓글창의 변화를 알 수 있다.
  // removeComment();
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
  console.log(Date.now());
}
//1. 먼저 comment.text 들을 모두 가져와서 페이지  첫 로딩시 표시 되로록 한다. --> 이것은 pug에 있는 each in 으로 해결
//2. 추가적인 댓글이 있을경우, 추가로 다시 댓글을 추가한다.  --> 자바스크립트로, 추가되는 comment 정보를, 추가된 comment의 개수 만큼 표기하는 for 문을 이용하여 해결

// 여기서 추가된 댓글을 포함하여 전체댓글을 다시 표시할것인지,
// 추가된 댓글만 추가로 표시할 것인지.

// pug에서 each in 으로 표시하는 방식은, 페이지가 렌더링 되어야만 변화된 값이 적용된다
// 따라서, 실시간으로 변하된 값을 적용시키려면, 자바스크립트로 comment 데이터를 api로 받아서,
// 이정보를 html 페이지에 동적으로 추가시키는 방식을 써야 한다고 본다.
// 그래서나는, pug에서 렌더링으로 표현하는 방식을 버리고, 자바스립트에서 동적으로 표시하는 방식을 선택하고자 한다.
