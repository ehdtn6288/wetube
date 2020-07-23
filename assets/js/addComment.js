import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentsList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");

function decreaseCommentNum() {
  commentNum.innerHTML = parseInt(commentNum.innerHTML) - 1;
}

const addComment = (commentText, commentId, commentCreator, userId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  span.innerHTML = commentText;
  delBtn.className = commentId;

  if (commentCreator === userId) {
    // 본인이 로그인 했을때만, 삭제표시 해주기
    delBtn.innerHTML = "❌";
    delBtn.classList.add("comment__delete-btn");
    li.appendChild(delBtn);
    delBtn.addEventListener("click", handleDelete);
  }

  span.classList.add("comment__text");

  li.appendChild(span); // li 안에 span 이 들어간 형태(노드)만 만들어 줌.
  commentsList.prepend(li); //.prepend or .append 를 통해 만들어진 노드를 삽입
};

const handleDelete = (event) => {
  console.log(event.path[1]);
  console.log(event.target.className.split(" ")[0]); //자르고 붙여서 클래스에 등록된 코멘트 id 값을 가져온다.
  event.path[1].remove();
  const commentId = event.target.className.split(" ")[0];
  decreaseCommentNum();
  removeComment(commentId);
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
  const response = await axios({
    url: `/api/${videoId}/comments`,
    method: "DELETE",
    data: {
      commentId: commentId,
    },
  });
  console.log(response);
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
  console.log(response);
};

let originalCommentNum;
let newCommentNumber;

const setCommentData = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  try {
    const response = await axios.get(`/api/${videoId}/comments`);
    newCommentNumber = response.data.video.comments.length;
    const comments = response.data.video.comments;
    if (response.data.user) {
      const user = response.data.user;
      // console.log(comments[50].creator.trim(), user._id.trim());
      // console.log(user._id == comments[50].creator);
      // console.log(comments[2]);
      if (response.status == 200) {
        if (originalCommentNum != newCommentNumber) {
          for (var i = originalCommentNum; i < newCommentNumber; i++) {
            addComment(
              comments[i].text,
              comments[i]._id,
              comments[i].creator,
              user._id
            );
          }
          originalCommentNum = newCommentNumber;
        }
      }
      setCommentNum(newCommentNumber);
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
    if (response.data.user) {
      const user = response.data.user;
      console.log(comments[50].creator.trim(), user._id.trim());
      console.log(user._id == comments[50].creator);
      console.log(response);
      originalCommentNum = response.data.video.comments.length;
      for (var i = 0; i < originalCommentNum; i++) {
        addComment(
          comments[i].text,
          comments[i]._id,
          comments[i].creator,
          user._id
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function setCommentNum(commentNumber) {
  commentNum.innerHTML = commentNumber;
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

function init() {
  getOriginalCommentNum(); // 시작시점의 코멘트 갯수를 가져온다.

  setInterval(setCommentData, 5000); // 이걸 키면 실시간으로 댓글창의 변화를 알 수 있다.
  removeComment();
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
//1. 먼저 comment.text 들을 모두 가져와서 페이지  첫 로딩시 표시 되로록 한다. --> 이것은 pug에 있는 each in 으로 해결
//2. 추가적인 댓글이 있을경우, 추가로 다시 댓글을 추가한다.  --> 자바스크립트로, 추가되는 comment 정보를, 추가된 comment의 개수 만큼 표기하는 for 문을 이용하여 해결

// 여기서 추가된 댓글을 포함하여 전체댓글을 다시 표시할것인지,
// 추가된 댓글만 추가로 표시할 것인지.

// pug에서 each in 으로 표시하는 방식은, 페이지가 렌더링 되어야만 변화된 값이 적용된다
// 따라서, 실시간으로 변하된 값을 적용시키려면, 자바스크립트로 comment 데이터를 api로 받아서,
// 이정보를 html 페이지에 동적으로 추가시키는 방식을 써야 한다고 본다.
// 그래서나는, pug에서 렌더링으로 표현하는 방식을 버리고, 자바스립트에서 동적으로 표시하는 방식을 선택하고자 한다.
