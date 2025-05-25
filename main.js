let addTask = document.querySelector(".add-title");
let addUrl = document.querySelector(".add-url");
let addBookmark = document.querySelector(".add-btn");
let emptyState = document.querySelector(".empty-state");
let bookmarksParent = document.querySelector(".bookmarks");
let searchDiv = document.querySelector(".search");
let pagination = document.querySelector(".pagination");

let bookMarksList = [];
renderTasks(bookMarksList, emptyState, bookmarksParent);

// if (bookMarksList.length < 4) pagination.classList.add("hidden");

// add bookmark

addBookmark.addEventListener("click", (_) => {
  let taskVal = addTask.value.trim();
  let urlVal = addUrl.value.trim();
  if (validateForm(taskVal, urlVal, addBookmark)) {
    addTask.value = "";
    addUrl.value = "";

    createBookmark(taskVal, urlVal, bookMarksList);
    renderTasks(bookMarksList, emptyState, bookmarksParent);

    if (bookMarksList.length > 4) {
      pagination.classList.remove("hidden");
    }
  }
});

// search bookmarks
searchDiv.addEventListener("input", (e) => {
  let userInput = e.target.value;

  if (!bookMarksList.length < 1) {
    let result = bookMarksList.filter((task) =>
      searchBookmark(task.taskVal, userInput)
    );

    renderTasks(result, emptyState, bookmarksParent, true);
  }
  if (userInput.length == 0)
    renderTasks(bookMarksList, emptyState, bookmarksParent, false);
});

document.addEventListener("click", (e) => {
  // pagination
  if (e.target.classList.contains("page")) {
    paginationFunction(e.target.innerText);
  }
});
