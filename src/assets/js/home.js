const videosArrangeBox = document.getElementById("jsVideosArrangeBox");
const arrangeATag = document.querySelector("a");
const init = () => {
  //   console.log(videosArrangeBox.children[0].innerText);
  const liArray = videosArrangeBox.children;
  for (i = 0; i < liArray.length; i++) {
    const currentHref = window.location.href;
    if (currentHref === liArray[i].children[0].href) {
      console.log(liArray[i].children[0].href);
      const el = liArray[i];
      el.classList.add("selected");
      //   el.style.transform = "translateY(-10px)";
    }
  }
  //   console.log(window.location.search.includes("views"));
  //   console.log(kim);
};
if (videosArrangeBox) {
  init();
}
