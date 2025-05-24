let addTask = document.querySelector(".add-title");
let addUrl = document.querySelector(".add-url");
let addBookmark = document.querySelector(".add-btn");

let bookMarksList = [];

addBookmark.addEventListener("click", (_) => {
  let taskVal = addTask.value.trim();
  let urlVal = addUrl.value.trim();
  if (validateForm(taskVal, urlVal, addBookmark)) {
    addTask.value = "";
    addUrl.value = "";

    let bookmark = {
      taskVal,
      urlVal,
    };

    bookMarksList.unshift(bookmark);
  }
});
