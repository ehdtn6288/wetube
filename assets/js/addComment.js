import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentsList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");

function increaseCommentNum() {
  commentNum.innerHTML = parseInt(commentNum.innerHTML) + 1;
}

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span); // li 안에 span 이 들어간 형태(노드)만 만들어 줌.
  commentsList.prepend(li); //.prepend or .append 를 통해 만들어진 노드를 삽입
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
  if (response.status == 200) {
    addComment(comment);
  }
  console.log(response);
};

const setCommentData = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    const newCommentNumber = response.data.comments.length;
    setCommentNum(newCommentNumber);
  } catch (error) {
    console.log(error);
  }
};

function setCommentNum(commentNumber) {
  commentNum.innerHTML = commentNumber;
}

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
  console.log(comment);
}

function init() {
  setInterval(setCommentData, 5000);

  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
