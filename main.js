let addTask = document.querySelector(".add-title");
let addUrl = document.querySelector(".add-url");
let addBookmark = document.querySelector(".add-btn");
let emptyState = document.querySelector(".empty-state");
let bookmarksParent = document.querySelector(".bookmarks");
let searchDiv = document.querySelector(".search");

let bookMarksList = [];
renderTasks(bookMarksList, emptyState, bookmarksParent);

addBookmark.addEventListener("click", (_) => {
  let taskVal = addTask.value.trim();
  let urlVal = addUrl.value.trim();
  if (validateForm(taskVal, urlVal, addBookmark)) {
    addTask.value = "";
    addUrl.value = "";

    createBookmark(taskVal, urlVal, bookMarksList);
    renderTasks(bookMarksList, emptyState, bookmarksParent);
  }
});

// search bookmarks
searchDiv.addEventListener("input", (e) => {
  let userInput = e.target.value;

  if (!bookMarksList.length < 1) {
    let result = bookMarksList.filter((task) =>
      searchBookmark(task.taskVal, userInput)
    );

    renderTasks(result, emptyState, bookmarksParent);
  }
});
